require('dotenv').config();
const fastify = require('fastify')({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname', // Sembunyikan ID proses biar ringkas
            },
        },
    },
})

fastify.register(require('./plugins/db'))
fastify.register(require('./plugins/auth'))

fastify.register(require('./routes'))

const start = async () => {
    try {
        await fastify.listen({ port: 5000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()