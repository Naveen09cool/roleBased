/*schema for signup */
const {MESSAGES , REGEX} = require('../../utils/regex.util')
const schemas = function(){}

schemas.createAdmin = {
    id: "createAdmin",
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
        },
        is_admin: {
            type:"boolean",
            required:true,
            enum:[true],
            message:"is admin must be true"
        }
    }
}

schemas.createAgent = {
    id: "createAgent",
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
        },
        is_admin: {
            type:"boolean",
            required:true,
            enum:[false],
            message:"is admin must be false"
        },
        user_type: {
            type:"string",
            required:true,
            enum:['agent'],
            message:"is user type must be agent"
        }

    }
}
module.exports = schemas