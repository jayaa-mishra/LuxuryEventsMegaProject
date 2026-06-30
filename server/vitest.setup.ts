// Provide the env vars the config validator requires so importing modules that
// transitively load `config/env` doesn't throw during unit tests.
process.env.NODE_ENV = 'test';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/luxury_events_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret';
process.env.REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
