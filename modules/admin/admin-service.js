const constants = require('../../utils/constants')
const schemas = require('./admin-scheama')
const common = require('../../utils/common')
const auth = require('../auth/auth-model')

module.exports.signUp = async (req , res ) => {
    try{
      console.log("_____________", req.body);
        // const reqData = common.sanitize(req.body , schemas.createUser,  constants.moduleNames.users)
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