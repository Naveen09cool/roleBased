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
        },
        user_type:{
            type:"enum",
            required:true,
            enum: ['adminUser'],
            message:"user_type must be from predefined enums"
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
        user_type:{
            type:"enum",
            required:true,
            enum: ['agentUser', 'siteUser', 'storeUser'],
            message:"user_type must be from predefined enums"
        },
        parent_id: {
            type:"number",
            message:"is user type must be a valid number",
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
            message:"Id be of type number"
        }
    },
}

schemas.listUserByType = {
    id:"listUserByType",
    type:"object",
    properties: {
        user_type: {
            type:"string",
            required:true,
            enum:['agentUser', 'siteUser', 'storeUser'],
            message:"Id be from pre-defined type"
        },
        pageSize:{
            type:"number",
            message:"pageSize be of type number"
        },
        currentPage:{
            type:"number",
            message:"currentPage be of type number"
        }
    }
}
module.exports = schemas