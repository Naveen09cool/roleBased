const sqlInstance = require('../../database/index')
const encryption = require('../../utils/encryption')
const constants = require('../../utils/constants')
const common = require('../../utils/common')

/*For user Registration */
exports.userRegistration = async (requestData,requestUser) => {
try{
    const hashed = await encryption.getEncryptedPassword(requestData.password)
    const createdBy = await (requestUser?.user_id) || null
    if(requestData.user_type !== 'agentUser'){
        if(requestData.parent_id){
            const parentUser = await sqlInstance.sequelize.models.users.findOne({
                where:{
                    user_id:requestData.parent_id
                }
            })
            console.log(parentUser);
            if((!parentUser)||(requestData.user_type === 'siteUser' && parentUser.user_type !== 'agentUser')||(requestData.user_type === 'storeUser' && parentUser.user_type !== 'siteUser')){
                throw new Error('Invalid Parent')
            }
        }
    }
    console.log(requestData);
    const user = await sqlInstance.sequelize.models.users.create({
        ...requestData, 
        password : hashed.password + ':' + hashed.salt,
        createdBy : createdBy
    }) 
    if(requestData.user_type === 'siteUser'){
        await sqlInstance.sequelize.models.agentSites.create({
            agent_id : requestData.parent_id,
            site_id : user.user_id
        })
        user.agent_id = requestData.parent_id
    }else if(requestData.user_type === 'storeUser'){
        const agent = await sqlInstance.sequelize.models.agentSites.findOne({
            where:{
                site_id : requestData.parent_id
            }
        })
        await sqlInstance.sequelize.models.siteStores.create({
            agent_id: agent.agent_id,
            site_id : requestData.parent_id,
            store_id : user.user_id
        })
        user.site_id = requestData.parent_id;
        user.agent_id = agent.agent_id;
    }
    await user.save()
    return user;
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