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

schemas.createUser = {
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
        user_type_id: {
            type:"number",
            required:true,
            message:"is user type must be a valid number"
        },
        parent: {
            type:"number",
            message:"is user type must be a valid number",
            // required:true
        }
    }
}

schemas.createUserType = {
    id: "createUserType",
    type:"object",
    properties : {
        type_name: {
            type:"string",
            required:true,
            enum:['agent','site','store'],
            message:"is user type must be agent or site or store"
        }

    }
}

schemas.userById = {
    id: "userById",
    type:"object",
    properties : {
        id: {
            type:"number",
            required:true,
            message:"Id be of type string"
        }
    }
}
module.exports = schemas