import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { clearAuthData } from '@/utils/auth-utils';

type UserProfile = Database['public']['Tables']['profiles']['Row'];

interface UserData {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

export function useUser(): UserData {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const initialLoadComplete = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    // Function to fetch user profile
    const fetchProfile = async (userId: string) => {
      try {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (!isMounted.current) return;

        if (error) {
          console.error('Error fetching profile:', error);
          // If profile doesn't exist, try to create it
          if (error.code === 'PGRST116') { // Row not found
            await createProfile(userId);
          }
        } else {
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error in fetchProfile:', error);
      }
    };

    // Function to create user profile if it doesn't exist
    const createProfile = async (userId: string) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user || !isMounted.current) return;

        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário',
            crm: user.user_metadata?.crm || null,
            phone: user.user_metadata?.phone || null
          })
          .select()
          .single();

        if (!isMounted.current) return;

        if (error) {
          console.error('Error creating profile:', error);
        } else {
          setProfile(newProfile);
        }
      } catch (error) {
        console.error('Error in createProfile:', error);
      }
    };

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();

        if (!isMounted.current) return;

        if (error) {
          console.error('Error getting session:', error);
          // If there's an auth error, clean the data
          if (error.message?.includes('Invalid Refresh Token') || error.message?.includes('refresh_token_not_found')) {
            clearAuthData();
          }
          setLoading(false);
          return;
        }

        setSession(initialSession);

        // If there's a session, get the profile
        if (initialSession?.user) {
          await fetchProfile(initialSession.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (isMounted.current) {
          clearAuthData();
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
          initialLoadComplete.current = true;
        }
      }
    };

    // Start initialization
    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!isMounted.current) return;

        // Só processar eventos depois do carregamento inicial
        if (!initialLoadComplete.current) return;

        setSession(newSession);

        if (event === 'SIGNED_IN' && newSession?.user) {
          setLoading(true);
          await fetchProfile(newSession.user.id);
          if (isMounted.current) {
            setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: session?.user || null,
    profile,
    loading
  };
}
