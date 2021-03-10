const User = require('../models/User');
const {syncMongoAndRedis,getDataFromRedis} = require('../services/cache')

//all query read operator use redis as first check
const getUsers = async (req,res,next) => {
    try {
        const allUsers = await getDataFromRedis()
        if(allUsers.length < 0){
            let getAllUserFromDb = await User.find()
            res.send(getAllUserFromDb)            
        }else{
            res.send(allUsers)
        }
    } catch (error) {
        res.send(error)
    }
}

const findUserByAccountNumber =async (req,res,next) => {
    let {accountNumber} = req.params
    try {
        const allUsers = await getDataFromRedis()
        const result = allUsers.filter(e => e.accountNumber == accountNumber)
        if(result.length < 0){
            let getUserFromDb = await User.findOne({accountNumber})
            res.send(getUserFromDb)            
        }else{
            res.send(result)
        }
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}

const findUserByIdentityNumber =async (req,res,next) => {
    let {identityNumber} = req.params
    try {
        const allUsers = await getDataFromRedis()
        const result = allUsers.filter(e => e.identityNumber == identityNumber)
        if(result.length < 0){
            let getUserFromDb = await User.findOne({identityNumber})
            res.send(getUserFromDb)            
        }else{
            res.send(result)
        }
    } catch (error) {
        res.send(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        let userCreated = await User.create(req.body)
        await syncMongoAndRedis()
        res.send(userCreated)
    } catch (error) {
        errorCheck(error,res)
    }
}

const updateUser = async (req, res, next) => {
    const {Id} = req.params
    try {
        let userUpdated = await User.updateMany({Id},req.body)
        await syncMongoAndRedis()
        res.send(userUpdated)
    } catch (error) {
        res.send(error)
    }
}

const deleteUser = async (req, res, next) => {
    const {Id} = req.params
    try {
        let userDeleted =await User.deleteOne({Id})
        await syncMongoAndRedis()
        return res.send(userDeleted)
    }catch (error) {
        return res.send(err)
    }
}

const errorCheck = (err,res) => {
    if(err.driver){
        let fieldDup = JSON.stringify(err.keyValue)
        .slice(0,-1).slice(1).split(":")
        let keyDup = fieldDup[0].slice(0,-1).slice(1)
        let errMessage = {
            err,
            keyDup,
            message : keyDup+" "+fieldDup[1]+" is already exists",
            }
        return res.send(errMessage)
    }else{
        return res.send(err)
    }  
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    findUserByAccountNumber,
    findUserByIdentityNumber
}