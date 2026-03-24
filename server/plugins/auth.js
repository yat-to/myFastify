const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
    fastify.register(require('fastify-bcrypt'), {
        saltWorkFactor: 10
    });

    fastify.register(require('@fastify/jwt'), {
        secret: process.env.JWT_SECRET
    });

    fastify.decorate('authenticate', async(req, res) => {
        try {
            await req.jwtVerify();
        } catch (err) {
            res.send(err);
        }
    })
})