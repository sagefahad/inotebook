const jwt = require('jsonwebtoken');

const JWT_SECRET = 'somesecret$tring';

const fetchuser = (req,res,next) => {    
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try {
        const userdata = jwt.verify(token,JWT_SECRET);
        //console.log(userdata);
        req.id = userdata.id;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }

}

module.exports = fetchuser;