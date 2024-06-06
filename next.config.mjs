/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    API_URL: process.env.EMAIL_API_URL
      ? process.env.EMAIL_API_URL.replace('/send-email', '')
      : 'https://api.dev.signin.nhs.uk/nhs-login-support',
    ACCESS_FRONTEND_URL: process.env.ACCESS_FRONTEND_URL || 'https://access.dev.signin.nhs.uk',
  },
};

export default nextConfig;
