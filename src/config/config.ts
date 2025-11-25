const config = {
  apiBaseUrlPublic: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000', // URL base del API
  apiBaseUrlServer: process.env.BACKEND_URL || 'http://localhost:4000', // URL base del API
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'EcommerceApp',                // Nombre de la aplicación
};

export default config;