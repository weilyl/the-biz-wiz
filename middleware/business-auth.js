// const { request } = require('express');
const jwt = require('jsonwebtoken');

// generate JWT
async function generateToken (user) {
    const secret = process.env.SECRET;

    const token = await jwt.sign(
        {
            userID: user["id"]
        },
        secret,
        {
            expiresIn: '60d'
        }
    );

    console.log(`Token: ${token}`);

    return token;
}

// authorize
async function authorize (req, res, next) {

    const secret = process.env.SECRET;

    // no token
    if (!req.headers.authorization) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

    // Bearer token
    
    // below for when we have a frontend
    // const token = req.headers.authorization.split(" ")[0] === "Bearer" ? req.headers.authorization.split(" ")[1] : null;

    const token = req.headers.authorization.split(" ")[1]

    console.log(token)

    let decoded;

    try {
        decoded = await jwt.verify(token, secret);
    } catch (err) {
        console.log('code')
        return res.status(401).json({
            message: err.message
        })
    }

    if (decoded) {
        req.user_name = decoded.user_name;
        req.password = decoded.password;
        next();
    }
}



// export above

module.exports = {
    generateToken,
    authorize
}