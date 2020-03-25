module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN,
  DATABASE_URL:
    process.env.DATABASE_URL || 'postgresql://paulbaisley@localhost/video_store',
  JWT_SECRET: process.env.JWT_SECRET || 'test-secret'
};
