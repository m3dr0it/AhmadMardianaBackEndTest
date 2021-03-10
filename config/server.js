const redis = require('redis')
const config = require('./config')
const mongoose = require('mongoose');

let mongoRemoteServer = "mongodb+srv://"+config.db_user_name+":"+config.db_password+"@cluster0.bkezq.gcp.mongodb.net/"+config.db_remote+"?retryWrites=true&w=majority"

mongoose.connect(mongoRemoteServer,{
    useUnifiedTopology:true,
    useNewUrlParser:true
},(err) => {
    console.log(err)
})

let redisClient = redis.createClient({
    host: 'redis-12149.c246.us-east-1-4.ec2.cloud.redislabs.com',
    port:12149,
    password:"dyhVbwu9YI3a7JoLggE1oPNMpp9S3yxe"
});

redisClient.ping((err,reply) => {
    err ? console.log(err) : console.log(reply);
})

module.exports = {redisClient,mongoose}