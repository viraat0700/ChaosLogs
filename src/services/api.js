const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
    async ingestEvent(text) {
        const response = await fetch(`${API_URL}/ingest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        return response.json();
    },

    async getEvents() {
        const response = await fetch(`${API_URL}/events`);
        return response.json();
    },

    async getStats() {
        const response = await fetch(`${API_URL}/stats`);
        return response.json();
    }
};
