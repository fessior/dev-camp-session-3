export const config = {
  port: 3000,
  dbConnString: 'mongodb://db:27017',
  jwtSecret: 'my-secret',
  mongooseDebug: false,
} as const;
