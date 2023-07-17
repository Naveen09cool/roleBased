const constants = require('../../utils/constants')
const schemas = require('./admin-scheama')
const common = require('../../utils/common')
const auth = require('../auth/auth-model')
const admin = require('./admin-model')

module.exports.signUp = async (req , res ) => {
    try{
      console.log("_____________", req.body);
        const reqData = req.body
        const validationData = common.validateSchema(reqData, schemas.createAdmin);
        if (validationData.length === 0) {
            const authDetails = await auth.userRegistration(reqData)
            res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: authDetails
          })
        }else {
          return res.status(constants.httpStatusCode.badRequest).send({
              code: constants.responseCodes.revalidation,
              message:validationData
          })
        }
    }catch(error){ 
        res.status(constants.responseCodes.failedOperation).send({
        code: constants.responseCodes.failedOperation,
        message: error.message
    })
  }
}

module.exports.createUser = async (req , res ) => {
    try{
        const reqData = req.body
        const reqUser = req.user
        console.log(reqUser,'::::::::::');
        const validationData = common.validateSchema(reqData, schemas.createUser);
        if (validationData.length === 0 && reqUser.is_admin === true) {
            const authDetails = await auth.userRegistration(reqData,reqUser)
            res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: authDetails
          })
        }else {
          return res.status(constants.httpStatusCode.badRequest).send({
              code: constants.responseCodes.revalidation,
              message:validationData
          })
        }
    }catch(error){ 
        res.status(constants.responseCodes.failedOperation).send({
        code: constants.responseCodes.failedOperation,
        message: error.message
    })
  }
}


module.exports.createUserType = async (req , res ) => {
  try{
      const reqData = req.body
      const reqUser = req.user
      const validationData = common.validateSchema(reqData, schemas.createUserType);
      if (validationData.length === 0 && reqUser.is_admin === true) {
          const authDetails = await admin.createUserType(reqData)
          res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.successfulOperation,
          message: constants.messageKeys.en.msg_success,
          data: authDetails
        })
      }else {
        return res.status(constants.httpStatusCode.badRequest).send({
            code: constants.responseCodes.revalidation,
            message:validationData
        })
      }
  }catch(error){ 
      res.status(constants.responseCodes.failedOperation).send({
      code: constants.responseCodes.failedOperation,
      message: error.message
  })
}
}

module.exports.listAllUser = async (req , res ) => {
    try{
        const reqData = req.body
        const reqUser = req.user
        if (reqUser.is_admin === true) {
            const authDetails = await admin.listAllUser(reqData)
            res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: authDetails
          })
        }else {
          return res.status(constants.httpStatusCode.badRequest).send({
              code: constants.responseCodes.revalidation,
              message:validationData
          })
        }
    }catch(error){ 
        res.status(constants.responseCodes.failedOperation).send({
        code: constants.responseCodes.failedOperation,
        message: error.message
    })
  }
}

module.exports.userById = async (req , res ) => {
    try{
        const reqUser = req.user
        const reqData = req.body
        const validationData = common.validateSchema(reqData, schemas.userById);
        if (validationData.length === 0 && reqUser.is_admin === true) {
            const authDetails = await admin.userById(reqData)
            res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: authDetails
          })
        }else {
          return res.status(constants.httpStatusCode.badRequest).send({
              code: constants.responseCodes.revalidation,
              message:validationData
          })
        }
    }catch(error){ 
        res.status(constants.responseCodes.failedOperation).send({
        code: constants.responseCodes.failedOperation,
        message: error.message
    })
  }
}