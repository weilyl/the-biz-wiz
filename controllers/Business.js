const db = require('../db')

//get all businesses from database
async getAllBusinesses(req,res){
    try{
        const business = await db.any('SELECT * FROM businesses')
        return res.json(businesses)
    }
    catch(err){
        res.status(500).send(err)
    }

}
//get business by location
async locateBusiness(req,res){
    const address=JSON.stringify(req.params.address)
    try{
        const businesses=await db.any("SELECT * FROM businesses WHERE address=$1",
        address)
        return res.json(businesses)    
    }
    catch(err){
        res.status(500).json(err)
    }
}
//get business by name 
async getBusinessByName(req,res){
    const names = JSON.stringify(req.params.business_name)
    try{
        await db.any("SELECT * FROM businesses WHERE business_name=$1",
        names)
        return res.json(names)
    }
    catch(err){
        res.status(500).json(err)
    }
}
//get a single business from table matching id
async getABusiness(req,res){
    const id=parseInt(req.params.id,10)
    try{
        const business = await db.one("SELECT * FROM businesses where id = $1",
        id
        )
        return res.json(business)
    }
    catch(err){
        res.status(500).json(err)
    }
}
//create one business and add to table
async createBusiness (req,res) {
    try{
        await db.none("INSERT INTO businesses (business_name,user_name, password, address, type, logo) VALUES (${business_name}, ${user_name}, ${password}, ${address}, ${type}, ${logo})", req.body);
        return res.json({
            message: "success"
        });
    }
    catch(err){
        res.status(500).send(err)
    }
}
//update single business from database
async updateBusiness(req,res){
    const id=parseInt(req.params.id,10)
    try{
        await db.none("UPDATE businesses SET business_name=$1, user_name=$2, password=$3, address=$4, type=$5, logo=$6 WHERE id=$7", [
            req.body.business_name,
            req.body.user_name,
            req.body.password, 
            req.body.address,
            req.body.type,
            req.body.logo,
            id
        ])
        return res.json({
            message:"success"
        })
    }
    catch{
        res.status(500).json(err)
    }
}
//delete a business from database
async deleteBusiness(req,res){
    const id = parseInt(req.params.id,10)
    try{
        await db.none("DELETE FROM businesses WHERE id=$1",
        id)
        return res.json({
            message:"success"
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}


module.exports = Business