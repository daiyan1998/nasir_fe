const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getImageUrl = (path?: string) => path ? `${API_BASE_URL}${path}` : '/placeholder.png';
