
// Script to verify AI configuration and connection
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually parse .env file since dotenv might not be installed
function loadEnv() {
    try {
        const envPath = path.resolve(__dirname, '../.env');
        if (fs.existsSync(envPath)) {
            console.log(`Loading .env from ${envPath}`);
            const content = fs.readFileSync(envPath, 'utf-8');
            const lines = content.split('\n');
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const [key, ...values] = trimmed.split('=');
                    if (key && values.length > 0) {
                        const value = values.join('=').trim();
                        process.env[key.trim()] = value;
                    }
                }
            }
        } else {
            console.warn('.env file not found!');
        }
    } catch (e) {
        console.error('Error loading .env:', e);
    }
}

loadEnv();

async function verify() {
    console.log("Verifying AI Configuration...");
    console.log("--------------------------------");

    // Check Config
    const provider = process.env.VITE_AI_PROVIDER;
    const model = process.env.VITE_AI_MODEL;
    const apiKey = process.env.VITE_AI_API_KEY;

    console.log(`Provider (env): ${provider}`);
    console.log(`Model (env): ${model}`);
    // Hide most of the key
    const maskedKey = apiKey ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 4)}` : 'NOT SET';
    console.log(`API Key set: ${maskedKey}`);

    if (provider !== 'gemini') {
        console.error("❌ ERROR: Provider should be 'gemini'.");
    } else {
        console.log("✅ Provider configured correctly.");
    }

    if (model !== 'gemini-2.5-pro') {
        console.warn("⚠️  WARNING: Model is not 'gemini-2.5-pro'. Found: " + model);
    } else {
        console.log("✅ Model configured correctly.");
    }

    console.log("\nTesting Connection...");
    console.log("--------------------------------");

    if (!apiKey) {
        console.error("❌ ERROR: API Key is missing. Cannot test connection.");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    console.log(`Fetching URL: ${url.replace(apiKey, '***')}`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: 'Hello, are you online?' }]
                }]
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("✅ Gemini API Response Received!");
            if (data.candidates && data.candidates.length > 0) {
                const text = data.candidates[0].content.parts[0].text;
                console.log("Response snippet:", text.substring(0, 60).replace(/\n/g, ' ') + "...");
            } else {
                console.log("Full Response:", JSON.stringify(data, null, 2));
            }
        } else {
            console.error(`❌ API Request Failed: ${response.status}`);
            const err = await response.text();
            console.error(err);
        }

    } catch (error) {
        console.error("❌ Connection Exception:", error);
    }
}

verify();
