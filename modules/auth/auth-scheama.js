const {MESSAGES , REGEX} = require('../../utils/regex.util')
const schemas = function(){}

/*schema for signup */
schemas.createUser = {
    id: "createUser",
    type:"object",
    properties : {
        full_name: {
            type:"string",
            required:true,
            message:"Full name should be of type string"
        },
        email: {
            type:"string",
            required:true,
            pattern: REGEX.EMAIL_FORMAT,
            message:MESSAGES.EMAIL_FORMAT_MESSAGE

        },
        password: {
            type:"string",
            required:true,
            pattern: REGEX.PASSWORD_RULE,
            message:MESSAGES.PASSWORD_RULE_MESSAGE
        }
    }
}

/*Schema for verify user  */
schemas.verifyUser = {
    id:'/verify',
    type:'object',
    properties:{
        token :{
            type:'string',
            required:true,
            message:'Token should be of type string and it is required'
        }
    }
}

/*Login schema */
schemas.login = {
    id:'/login',
    type:'object',
    properties:{
        username:{
            type:'string',
            required:true,
            pattern: REGEX.EMAIL_FORMAT,
            message:MESSAGES.EMAIL_FORMAT_MESSAGE
        },
        password:{
            type:'string',
            required:true,
            pattern: REGEX.PASSWORD_RULE,
            message:MESSAGES.PASSWORD_RULE_MESSAGE
        }
    }
}

module.exports = schemas