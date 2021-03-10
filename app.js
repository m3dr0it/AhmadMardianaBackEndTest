const express = require('express');
const app = express();
const User = require('./models/User')
const config = require('./config/config');
const userRouter = require('./router/user');
const {generateToken,validateToken} = require('./controllers/generateToken')
const {syncMongoAndRedis} = require('./services/cache')

app.use(express.json())
app.use(express.urlencoded())
app.use('/user',validateToken,userRouter)
app.use('/generate-token',generateToken)

syncMongoAndRedis().then((result) => {
  console.log(result)
}).catch((err) => {
  console.error(err)        
});

app.listen(config.port,() => {
  console.log("running on "+config.port)
})