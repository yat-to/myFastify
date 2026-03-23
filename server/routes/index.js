async function routes(fastify, options){
    fastify.get('/', async(req, res) => {
        return {
            message: 'API ready'
        }
    })

    fastify.get('/coba', async(req, res) => {
        return {
            message: 'API ready xxx'
        }
    })
}

module.exports = routes