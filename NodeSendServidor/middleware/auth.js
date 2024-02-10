import jwt from 'jsonwebtoken'
const auth = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (authHeader) {
        //OBTENER EL TOKEN
        const token = authHeader.split(' ')[1];
        //COMPROBAR EL JWT
        try {
            const usuario = jwt.verify(token, process.env.SECRETA)
            req.usuario = usuario
        } catch (error) {
            console.log(error)
            console.log('JWT No Válido')
        }
    }
    return next()
}

export default auth;