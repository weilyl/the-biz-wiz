require("dotenv").config();
const db = require("../db");
const bcrypt = require("bcrypt");
const {generateToken} = require ('../middleware/business-auth');

//get all businesses from database
async function getAllBusinesses(req, res) {
  try {
    const business = await db.any("SELECT * FROM businesses");
    return res.json(business);
  } catch (err) {
    res.status(500).send(err);
  }
}

//get business by location
async function locateBusiness(req, res) {
  const address = JSON.stringify(req.params.address);
  try {
    const businesses = await db.any(
      "SELECT * FROM businesses WHERE address=$1",
      address
    );
    return res.json(businesses);
  } catch (err) {
    res.status(500).json(err);
  }
}

//get business by name
async function getBusinessByName(req, res) {
  try {
    const results = await db.any(
      "SELECT * FROM businesses WHERE business_name = ${query} 0R description = '%${query}%'",
      req.params
    );
    return res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
}

//get a single business from table matching id
async function getABusiness(req, res) {
  const id = parseInt(req.params["business_id"], 10);
  try {
    const business = await db.one("SELECT * FROM businesses where id = $1", id);
    return res.json(business);
  } catch (err) {
    return res.status(500).json(err);
  }
}

//create one business and add to table
async function createBusiness(req, res) {

  let business = req.body;
  let hashedPassword;
  const saltRounds = 10;

  // validate business account info (needs work)
  if (!business) {
    return res.status(400).json({
      message: "Invalid account info"
    })
  }

  try {
    hashedPassword = await bcrypt.hash(business.password, saltRounds);
    business["password"] = hashedPassword;
  } catch (err) {
    return res.status(401).json({
      message: "Invalid password",
      error: err.message
    })
  }

  let token;
  
  try {
    const businessID = await db.one(
      "INSERT INTO businesses (business_name, user_name, password, address, type, logo) VALUES (${business_name}, ${user_name}, ${password}, ${address}, ${type}, ${logo}) RETURNING id",
      business
    );
      
    console.log("businessID ", businessID)
      
    token = await generateToken(businessID)
    
    // return res.status(201).json({
      //   message: "business account registered"
    // })

  } catch (err) {
    console.log("what about here")
    return res.status(400).send(err);
  }
  
  return res.status(201).json({token})
      
}

//login business
async function loginBusiness(req, res) {
  const { password } = req.body

  const {exists} = await db.one('SELECT EXISTS(SELECT * FROM businesses WHERE user_name=${user_name})', req.body)

  let business;

  if (!exists) {
    return res.status(404).json({
      message: "No user found with that user name"
    })
  } else {
    business = await db.one('SELECT * FROM businesses WHERE user_name=${user_name}', req.body)
  }

  let match;

  try {
    match = await bcrypt.compare(password, business.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    } else {

      const token = await generateToken(business);

      return res.status(202).json({"token": token})
    }

  } catch (err) {
    return res.status(400).json(err)
  }
}

//update single business from database
async function updateBusiness(req, res) {

  function parseBody(req) {
    const changes = Object.entries(req.body);
    console.log(`changes ${changes}`)

    let query = 'UPDATE businesses SET';

    changes.forEach(([key, value], idx) => {
        if (changes.length > 1 && idx!==changes.length-1) {
            query += ` ${key}='${value}',`
        } else {
            query += ` ${key}='${value}'`
        }
    })

    query += ` WHERE id=${parseInt(req["business_id"], 10)} RETURNING *;`

    console.log(`query: ${query}`)

    return query
  }

  try {
    await db.one(parseBody(req))
    return res.status(202).json({
      message: "success"
    });
  } catch (err){
    return res.status(500).json({
      message: err.message
    });
  }

}

//delete a business from database
async function deleteBusiness(req, res) {

  const id = parseInt(req["business_id"], 10);

  try {
    await db.none("DELETE FROM businesses WHERE id=$1", id);
    return res.json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllBusinesses,
  locateBusiness,
  getBusinessByName,
  getABusiness,
  createBusiness,
  loginBusiness,
  updateBusiness,
  deleteBusiness,
};
