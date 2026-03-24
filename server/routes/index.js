const userController = require('../controllers/userController')

async function routes(fastify, options){
    fastify.get('/', async(req, res) => {
        return {
            message: 'API ready'
        }
    })

    fastify.get('/hash', async (req, res) => {
        const hash = await fastify.bcrypt.hash('darmawan67');
        return { hash };
    });

    fastify.post('/login', userController.login)
    // fastify.post('/register', userController.register)
}

module.exports = routes