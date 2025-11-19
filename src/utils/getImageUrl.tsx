const API_IMG_URL = import.meta.env.VITE_IMG_URL || 'http://localhost:3000';

export const getImageUrl = (path?: string) => path ? `${API_IMG_URL}${path}` : '/placeholder.png';
