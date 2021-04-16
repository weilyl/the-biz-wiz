const { request } = require('express');
const jwt = require('jsonwebtoken');

// generate JWT

async function makeJWT (user) {
    const secret = process.env.SECRET;

    const token = await jwt.sign(
        {
            userID: user.id
        },
        secret
    );

    console.log(token);

    return token;
}

// authorize

async function authorize (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    // Bearer token

    const token = req.headers.authorization.split(" ")[1];

    let decoded;

    try {
        decoded = await jwt.verify(token, secret);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    if (decoded) {
        req.userID = decoded.userID;
        next();
    }
}



// export above

module.exports = {
    makeJWT,
    authorize
}