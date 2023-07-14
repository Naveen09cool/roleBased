const sqlInstance = require('../../database/index')
const encryption = require('../../utils/encryption')
const constants = require('../../utils/constants')
const common = require('../../utils/common')

/*For user Registration */
exports.userRegistration = async (requestData,requestUser) => {
try{
    const hashed = await encryption.getEncryptedPassword(...requestData.password)
    const createdBy = await (requestUser?.user_id) || null
    console.log(createdBy,"ooooooooooooooo");
    const user = await sqlInstance.sequelize.models.users.create({
        ...requestData, 
        password : hashed.password + ':' + hashed.salt,
        createdBy : createdBy
    })   
    return user
}catch(error){
    if(error.name.toLowerCase() === 'sequelizeuniqueconstrainterror'){
        throw new Error(constants.messageKeys.en.msg_usr_already_exits)
    }
    throw new Error(error)
}
}

/*verifying user by token after signup */
exports.verifyUser = async(requestData) => {
    try{
        const user = await sqlInstance.sequelize.models.users.findOne({
            where:{
                user_id:requestData.user_id
            }
        })
        if(user.is_verified === false){
            user.is_verified = true;
            user.save(user)
            return true;
        }
        return false;
    }catch(error){
        throw new Error(error)
    }
}

/*login  */
exports.login = async (requestData) => {
    try{
    const user = await sqlInstance.sequelize.models.users.findOne({where:{email:requestData.username }})
        if(user && user.is_verified){
            const isMatched = encryption.validatePassword(requestData.password , user.password)
            if(isMatched){
                let tokenDetails= {user_id :user.user_id }
                return await common.generateToken(tokenDetails)
            }else{
                return false 
            }
        }else{
            return false
        }
    }catch(error){
        throw new Error(error)
    }
}