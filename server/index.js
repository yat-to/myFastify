const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes'))

const start = async () => {
  try {
    await fastify.listen({port: 5000})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()