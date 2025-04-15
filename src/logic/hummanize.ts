
import getCookie from './getApiKey';
// Types for the function parameters
interface HumanizeParams {
    text: string;
    tone: string;
    creativityIndex: number;
    outputLanguage: string;
    preserveKeywords: boolean;
    enhanceClarity: boolean;
}

// Types for the API response
interface GeminiResponse {
    candidates: {
        content: {
            parts: {
                text: string;
            }[];
        };
    }[];
}

export default async function humanizeText({
    text,
    tone,
    creativityIndex,
    outputLanguage,
    preserveKeywords,
    enhanceClarity,
}: HumanizeParams): Promise<string> {

    try {
        const apiKey = getCookie('apiKey')
        const prompt = `
      Please rewrite the following text:
      "${text}"
      
      Apply these modifications:
      - Use a ${tone} tone
      - Output in ${outputLanguage}
      - Creativity level: ${creativityIndex}%
      ${preserveKeywords ? '- Preserve key terms and phrases' : ''}
      ${enhanceClarity ? '- Enhance clarity and readability' : ''}
    `;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: creativityIndex / 100,
                        topK: 40,
                        topP: 0.8,
                        maxOutputTokens: 1024,
                    }
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            alert(`API Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data: GeminiResponse = await response.json();

        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            alert('Invalid response format from Gemini API');
        }

        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error('Error in humanizeText:', error);
        throw error;
    }
}