import jwt from "jsonwebtoken"

const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            aud:userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '7d'
        }
    
        jwt.sign(payload, secret, options, (err, token) => {
            if(err) return reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = async (token) => {
    try 
    {
        const decoded = await jwt.decode(token);
        return decoded;
    } catch (error) 
    {
    // Handle JWT verification errors appropriately
    console.error('Error verifying access token:', error);
    throw new Error('Invalid access token'); // Or a more specific error message
    }
}

export {signAccessToken, verifyAccessToken}