const constants = require('../../utils/constants')
const schemas = require('./auth-scheama')
const common = require('../../utils/common')
const auth = require('./auth-model')

/*signup service */
module.exports.signUp = async (req , res ) => {
    try{
      console.log("_____________", req.body);
        // const reqData = common.sanitize(req.body , schemas.createUser,  constants.moduleNames.users)
        const reqData = req.body
        const validationData = common.validateSchema(reqData, schemas.createUser);
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

/*verify user service */
module.exports.verifyUser = async(req , res) => {
try{
  // const reqData = common.sanitize(req.body , schemas.verifyUser,  constants.moduleNames.users)
  const reqData = req.body;
   const validationData = common.validateSchema(reqData, schemas.verifyUser);
    if (validationData.length === 0) {
      const data = await common.decryptToken(req.body.token)
      const authDetails = await auth.verifyUser(data)
      res.status(constants.httpStatusCode.success).send({
        code: constants.responseCodes.successfulOperation,
        message: constants.messageKeys.en.msg_success,
        data: authDetails
      })
   }else{
    res.status(constants.httpStatusCode.badRequest).send({
      code: constants.responseCodes.revalidation,
      message: validationData
    })
   }
}catch(error){
 res.status(constants.responseCodes.failedOperation).send({
    code: constants.responseCodes.failedOperation,
    message: error.message 
})
}
}

/*service for user login  */
module.exports.login = async (req , res) => {
  try{
    // const reqData = common.sanitize(req.body, schemas.login , constants.moduleNames.users)
    const reqData = req.body;
    const validationData = common.validateSchema(reqData, schemas.login);
    if (validationData.length === 0) {
      const authDetails = await auth.login(reqData)
      if(authDetails){
        res.status(constants.httpStatusCode.success).send({
        code: constants.responseCodes.successfulOperation,
        message: constants.messageKeys.en.msg_success,
        data: authDetails
        })
      }else{
        console.log("into serviccccccce");
        res.status(constants.httpStatusCode.unauthorized).send({
        code: constants.responseCodes.unauthorizedAccess,
        message: constants.messageKeys.en.msg_unauthorized_user
      })
    }
    }else{
      res.status(constants.httpStatusCode.badRequest).send({
      code: constants.responseCodes.revalidation,
      message: validationData
    })
  }
  }catch(error){
    res.status(constants.responseCodes.failedOperation).send({
      code:constants.responseCodes.failedOperation,
      message:error.message
    })
  }
}
