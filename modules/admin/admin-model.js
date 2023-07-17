
const sqlInstance = require('../../database/index')
const encryption = require('../../utils/encryption')
const constants = require('../../utils/constants')
const common = require('../../utils/common')

exports.listAllUser = async (reqData) => {
try{
    const pageSize = reqData.pageSize || constants.pagination.deafultPageSize ;
    const currentPage = reqData.currentPage || constants.pagination.defaultCurrentPage ;
    const offset = (currentPage - 1) * pageSize;
    const type_id = reqData.user_type_id;
    const user = await sqlInstance.sequelize.models.users.findAndCountAll({
        where: {
            is_admin: false,
            user_type_id:type_id,
            user_id:7
        },
        include: [
            { 
                model: sqlInstance.sequelize.models.users,
                as: 'parent_id',
                nestedJoins: true,
                include: [
                    { 
                        model: sqlInstance.sequelize.models.users,
                        as: 'parent_id',
                        nestedJoins: true,
                    },
                ],
            },
        ],
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
        const agents = await sqlInstance.sequelize.models.users.findOne({
            where: {
                is_admin: false,
                user_id: id
            },
            include: [
                { 
                    model: sqlInstance.sequelize.models.users,
                    as: 'parent_id',
                    nestedJoins: true,
                    include: [
                        { 
                            model: sqlInstance.sequelize.models.users,
                            as: 'parent_id',
                            nestedJoins: true,
                        },
                    ],
                },
            ],
        })   
        return agents
        }catch(error){
            if(error.name.toLowerCase() === 'sequelizeuniqueconstrainterror'){
                throw new Error(constants.messageKeys.en.msg_usr_already_exits)
            }
            throw new Error(error)
        }
    }
