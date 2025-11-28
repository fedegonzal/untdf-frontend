// API Configuration
export const API_URL = import.meta.env.VITE_API_URL;
export const API_TOKEN = import.meta.env.VITE_API_TOKEN;

// Helper function to get authorization headers
export const getAuthHeaders = () => {
  const token = import.meta.env.VITE_API_TOKEN;
  return {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Helper function to get full product image URL
export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.VITE_API_URL;
  return `${baseUrl}${path}`;
};
