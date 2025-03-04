

export default async function registerApiKey(apiKey: string) {
    // Ensure the input is a string
    if (typeof apiKey !== "string" || apiKey.trim().length === 0) {
        console.error("Invalid API key provided.");
        return false;
    }

    // Sanitize and encode the API key
    const sanitizedApiKey = apiKey.trim(); // Remove leading/trailing whitespace
    try {
        document.cookie = `apiKey=${encodeURIComponent(sanitizedApiKey)}; path=/; max-age=31536000; secure; samesite=strict`;

    } catch { return false } return true
}
