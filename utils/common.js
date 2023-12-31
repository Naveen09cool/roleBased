const constants = require('./constants')
const config = require('../configurations/config')
const _ = require('lodash')
const jwt = require("jsonwebtoken")
const Validator = require('jsonschema').Validator

const _validator = new Validator()

exports.sanitize = function(object , schema , modelName){
    const schemaKeys = _.keys(schema.properties)
    const objectKeys = _.keys(object)
    const constantsValues = _.values(constants.keys)
    for (const key in objectKeys) {
        let isValueMatched = false
        for (const index in constantsValues) {
            if (constantsValues[index].indexOf(objectKeys[key].substring(0, constantsValues[index].length)) === 0) {           
                isValueMatched = true
                break
            }
        }         
        if(!isValueMatched && schemaKeys.indexOf(objectKeys[key])=== -1 ) {
            delete object[objectKeys[key]]
        } else {
            const propertyList = _.keys(schema.properties[objectKeys[key]])
            for (let index = 0; index < propertyList.length; index++) {
                if (propertyList[index] === '$ref') {
                    const refValue = schema.properties[objectKeys[key]]
                    let schemas = require('../modules/' + modelName + '/' + modelName + '-schema')
                    const refSchema = refValue.$ref.substring(1, refValue.$ref.length)
                    sanitize(object[objectKeys[key]], schemas[refSchema])
                }
            }
        }
    }
    return object
}

/*schema to validate is valid or not  */
exports.validateSchema = function(object , schema){
    const errors = _validator.validate(object , schema).errors
    if(errors.length >0){
        return errors.map((error) => {
        return error.schema.message
    })
    }
    return errors
}

exports.generateToken =  async(reqData)=>{
    const payload = {
        user_id : reqData.user_id,
    }
   return jwt.sign(payload ,
    config.get('JWT_TOKEN.SECRET'),
    { expiresIn:  config.get('JWT_TOKEN.ExpireTime')})  
}

exports.decryptToken = async (token) => {
 if(!token){
    return (constants.messageKeys.en.msg_session_expired, constants.httpStatusCode.forbidden)
 }
 const payload = await jwt.verify(token ,config.get("JWT_TOKEN.SECRET"), { expiresIn:  config.get('JWT_TOKEN.ExpireTime')} )
  if(payload){
    return payload
  }else{
   return (constants.messageKeys.en.msg_session_expired, constants.httpStatusCode.forbidden)
  }

}



// module.exports = {
//     sanitize: sanitize,
//     generateToken: generateToken,
//     decryptToken: decryptToken
// }