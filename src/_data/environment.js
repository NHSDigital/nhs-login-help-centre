module.exports = {
  EMAIL_API_URL: process.env.EMAIL_API_URL || 'https://api.dev.signin.nhs.uk/nhs-login-support/send-email',
  API_URL: process.env.EMAIL_API_URL ? process.env.EMAIL_API_URL.replace('/send-email', '') : 'https://api.dev.signin.nhs.uk/nhs-login-support',
  ACCESS_FRONTEND_URL: process.env.ACCESS_FRONTEND_URL || 'https://access.dev.signin.nhs.uk'
};