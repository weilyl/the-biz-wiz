// const { request } = require('express');
const jwt = require('jsonwebtoken');

// generate JWT

async function generateToken (user) {
    const secret = process.env.SECRET;

    const token = await jwt.sign(
        {
            user_name: user.user_name,
            password: user.password
        },
        secret
    );

    console.log(`Token: ${token}`);

    return token;
}

// authorize

async function authorize (req, res, next) {
    // no token
    if (!req.headers.authorization) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

    // Bearer token
    const token = req.headers.authorization.split(" ")[0] === "Bearer" ? req.headers.authorization.split(" ")[1] : null;

    let decoded;

    try {
        decoded = await jwt.verify(token, secret);
    } catch (err) {
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