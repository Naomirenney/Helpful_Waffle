import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
    try {
        const response = await ai.interactions.create({
            model: 'gemini-3.8-flash',
            input: 'Tell me a story',
        });
        console.log(JSON.stringify(response, null, 2));
    } catch (e) {
        console.error(e);
    }
}
run();
