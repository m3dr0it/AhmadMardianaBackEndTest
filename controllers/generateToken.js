const jwt = require('jsonwebtoken');
const generateToken = (req,res,next) => {
    const token = jwt.sign({name:"AhmadMardiana"},'secret', {
        expiresIn: '1h'
      });
    return res.send(token)
}

const validateToken = (req,res,next) => {
    let token = req.headers.authorization
    try {
        const verified = jwt.verify(token,'secret')
        if(verified){
            next()
        }else{
            res.send("Unauthorized access")
        }
    } catch (error) {
        console.log(error)
        res.send("Unauthorized access")
    }
}

module.exports = {generateToken,validateToken}