
const sqlInstance = require('../../database/index')
const encryption = require('../../utils/encryption')
const constants = require('../../utils/constants')
const common = require('../../utils/common')

exports.listUserByType = async (reqData) => {
try{
    const pageSize = reqData.pageSize || constants.pagination.deafultPageSize ;
    const currentPage = reqData.currentPage || constants.pagination.defaultCurrentPage ;
    const offset = (currentPage - 1) * pageSize;
    const userType = reqData.user_type;
    const user = await sqlInstance.sequelize.models.users.findAndCountAll({
        where: {
            is_admin: false,
            user_type:userType,
        },
        limit:pageSize,
        offset:offset,
    })  
    return user;
    }catch(error){
        if(error.name.toLowerCase() === 'sequelizeuniqueconstrainterror'){
            throw new Error(constants.messageKeys.en.msg_usr_already_exits)
        }
        throw new Error(error)
    }
}


exports.createUserType = async (requestData) => {
    try{
        const userType = await sqlInstance.sequelize.models.userTypes.create({
            ...requestData,
        })   
        return userType
    }catch(error){
        if(error.name.toLowerCase() === 'sequelizeuniqueconstrainterror'){
            throw new Error(constants.messageKeys.en.msg_usr_type_already_exits)
        }
        throw new Error(error)
    }
}

exports.userById = async (requestData) => {
    try{
        const id = requestData.id
        let user = await sqlInstance.sequelize.models.users.findOne({
            where: {
                is_admin: false,
                user_id: id
            },
            include:  [
                { 
                    model: sqlInstance.sequelize.models.agentSites,
                    as: 'agent',
                }
            ],
        })
        return user
        }catch(error){
            if(error.name.toLowerCase() === 'sequelizeuniqueconstrainterror'){
                throw new Error(constants.messageKeys.en.msg_usr_already_exits)
            }
            throw new Error(error)
        }
    }


    // exports.userByIde = async (requestData) => {
    //     try{
    //         const id = requestData.id
    //         let parent, child;
    //         let user = await sqlInstance.sequelize.models.users.findOne({
    //             where: {
    //                 is_admin: false,
    //                 user_id: id
    //             },
    //         })
    //         const agent = await sqlInstance.sequelize.models.agentSites.findOne({
    //             where:{
    //                 site_id:user.user_id
    //             },
    //         })
    //         if(agent){
    //             parent = await sqlInstance.sequelize.models.users.findOne({
    //             where:{
    //                 user_id: agent.agent_id
    //             }})
    //         }
    //         return {user,parent}
    //         }catch(error){
    //             if(error.name.toLowerCase() === 'sequelizeuniqueconstrainterror'){
    //                 throw new Error(constants.messageKeys.en.msg_usr_already_exits)
    //             }
    //             throw new Error(error)
    //         }
    //     }
