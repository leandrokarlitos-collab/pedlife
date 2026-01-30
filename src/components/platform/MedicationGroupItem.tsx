import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MedicationGroup } from '@/types/medication';
import MedicationListItem from './MedicationListItem';
import { ChevronDown, ChevronUp, Package, PlusCircle, MinusCircle, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { slugify } from '@/lib/utils';

interface MedicationGroupItemProps {
  group: MedicationGroup;
  categorySlug: string;
}

const MedicationGroupItem: React.FC<MedicationGroupItemProps> = ({ group, categorySlug }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Mostrar apenas a primeira variante quando não expandido
  const displayVariants = isExpanded ? group.variants : [group.variants[0]];

  // Agrupar variantes por forma de administração para melhor organização
  const variantsByForm = isExpanded ? group.variants.reduce((acc, med) => {
    const form = med.form || 'Outros';
    if (!acc[form]) acc[form] = [];
    acc[form].push(med);
    return acc;
  }, {} as Record<string, typeof group.variants>) : {};

  // Ordenar formas de administração comuns primeiro
  const formOrder = ['Oral', 'Xarope', 'Gotas', 'Injetável', 'Suspensão', 'Outros'];
  const sortedForms = isExpanded ? 
    Object.keys(variantsByForm).sort((a, b) => {
      const indexA = formOrder.indexOf(a) === -1 ? 999 : formOrder.indexOf(a);
      const indexB = formOrder.indexOf(b) === -1 ? 999 : formOrder.indexOf(b);
      return indexA - indexB;
    }) : [];

  return (
    <div className="mb-4 glass-card overflow-hidden group hover-lift transition-all duration-200 border border-gray-200 dark:border-gray-800">
      
      <div 
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          <div className="icon-glass-bg p-2.5 rounded-lg">
            <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
              {group.baseName}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                {group.variants.length} {group.variants.length === 1 ? 'variante' : 'variantes'}
              </Badge>
              
              {/* Mostrar badges para as formas mais comuns */}
              {!isExpanded && group.variants.slice(0, 2).map(med => med.form).filter((form, i, arr) => form && arr.indexOf(form) === i).map(form => (
                <Badge key={form} variant="secondary" className="text-xs">
                  {form}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="rounded-full" onClick={(e) => { e.stopPropagation(); toggleExpand(); }}>
          {isExpanded ? <MinusCircle className="h-4 w-4 text-primary" /> : <PlusCircle className="h-4 w-4 text-primary" />}
        </Button>
      </div>
      
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-20 opacity-90'} overflow-hidden`}>
        {isExpanded ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {sortedForms.map(form => (
              <div key={form} className="py-1">
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {form}
                </div>
                <div>
                  {variantsByForm[form].map((medication) => {
                    const medSlug = medication.slug || slugify(medication.name);
                    return (
                      <Link 
                        key={medSlug} 
                        to={`/platform/calculator/${categorySlug}/${medSlug}`}
                        className="block hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                      >
                        <MedicationListItem medication={medication} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Link 
              key={group.variants[0].slug || slugify(group.variants[0].name)} 
              to={`/platform/calculator/${categorySlug}/${group.variants[0].slug || slugify(group.variants[0].name)}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <MedicationListItem medication={group.variants[0]} />
            </Link>
            
            {group.variants.length > 1 && (
              <div className="px-4 py-3 text-sm text-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 border-t border-gray-200 dark:border-gray-800" onClick={toggleExpand}>
                <span className="flex items-center justify-center gap-2 text-primary font-medium">
                  <PlusCircle className="h-4 w-4" />
                  Ver mais {group.variants.length - 1} {group.variants.length - 1 === 1 ? 'variante' : 'variantes'}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MedicationGroupItem;
