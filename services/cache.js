const {mongoose,redisClient} = require('../config/server');
const util = require("util");
const User = require ('../models/User');
const config = require('../config/config');

redisClient.hget = util.promisify(redisClient.hget);
redisClient.hset = util.promisify(redisClient.hset);
redisClient.hgetall = util.promisify(redisClient.hgetall);

//Syncron data dari db ke redis.
const syncMongoAndRedis = async function(){
  let allUser = await User.find()
  let modelName = mongoose.modelNames()[0]
  let hashKey = config.db_remote
  return await redisClient.hset(hashKey,modelName,JSON.stringify(allUser))
}

const getDataFromRedis = async function(){
  let key = mongoose.modelNames()[0]
  let hashKey = config.db_remote
  let gotData = await redisClient.hget(hashKey,key)
  return JSON.parse(gotData)
}

//Query Caching
module.exports = {syncMongoAndRedis,getDataFromRedis};