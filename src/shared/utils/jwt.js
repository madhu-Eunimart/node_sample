import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const JWT_SECRET = 'secretkey'

const generateJWT = (payload) => {
    payload['jti'] = uuidv4()
    return jwt.sign(payload, JWT_SECRET)
}

export default generateJWT;
