const API_URL =
  process.env.REACT_APP_IN_VERCEL === "true"
    ? process.env.REACT_APP_API_URL // Use Render API in production (Vercel)
    : "http://127.0.0.1:5000"; // Use local backend in development

console.log("Using API URL:", API_URL); // Debugging purpose, remove for production

export default API_URL;