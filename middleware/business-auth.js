// const { request } = require('express');
const jwt = require('jsonwebtoken');

// generate JWT
async function generateToken (business) {
    const secret = process.env.SECRET;

    const token = await jwt.sign(
        {
            "business_id": business["id"],
            "acct_type": business["acct_type"]      
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
        req["business_id"] = decoded["business_id"];
        res[business_id] = decoded["business_id"];
        console.log("business id: ", req["business_id"])
        next();
    }
}



// export above

module.exports = {
    generateToken,
    authorize
}