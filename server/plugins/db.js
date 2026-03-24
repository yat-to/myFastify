const fp = require('fastify-plugin');
const mysql = require('@fastify/mysql');

module.exports = fp(async fastify => {
  fastify.register(mysql, {
    promise: true,

    host: process.env.HOST_DB_MYSQL,
    user: process.env.USER_DB_MYSQL,
    password: process.env.PASS_DB_MYSQL,
    database: 'penjualan',
    port: 3306
  });
  
  // Log untuk memastikan DB terhubung saat startup
  fastify.log.info('DB TERKONEKSI');
});