exports.login = async (req, res) => {
    console.log("ADA YANG LOGIN:", req.body.username);
    const { username, password } = req.body;

    try {
        // cari username dulu
        const [ rows ] = await req.server.mysql.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        )
        const user = rows[0];
        console.log("Password dari Postman:", password);
        console.log("Password dari Database:", user.password);
        const isMatch = await req.server.bcrypt.compare(password, user.password);
        console.log("Apakah Cocok?:", isMatch);

        if (!isMatch) {
            return res.code(401).send({ message: 'Password salah bos!' });
        }

        // validasi username & password
        if (!user || !(await req.server.bcrypt.compare(password, user.password))) {
            return res.code(401).send({
                message: "username atau password salah"
            })
        }

        // generate token
        const token = req.server.jwt.sign({
            id: user.id,
            username: user.username
        })

        // kirim respon sukses beserta tokennya
        return res.send({
            message: 'login berhasil',
            token: token
        })
    } catch (err) {
        req.server.log.error(err);
        return res.code(500).send({
            message: 'internal server error'
        })
    }
    // const { username, password } = req.body;
    // const { rows } = await req.server.pg.query('SELECT * FROM users WHERE username=$1', [username]);
    // const user = rows[0];

    // if (!user || !(await req.server.bcrypt.compare(password, user.password))) {
    //     return res.code(401).send({ message: 'Invalid email or password' });
    // }
}

exports.getAllUsers = async (req, res) => {
    return [{ id: 1, username: 'admin' }]
}