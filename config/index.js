module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    db: {
        username: process.env.DB_USERNAME,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST
    }
};
