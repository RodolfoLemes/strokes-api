export const generalConfigs = {
  PORT: process.env.PORT,
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
};
