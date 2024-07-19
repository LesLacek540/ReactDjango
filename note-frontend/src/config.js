// src/config.js
const production = {
    API_URL: 'ec2-18-217-121-142.us-east-2.compute.amazonaws.com/api',
  };
  
  const development = {
    API_URL: 'http://localhost:8000/api',
  };
  
  export const config = process.env.NODE_ENV === 'production' ? production : development;