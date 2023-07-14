const convict = require("convict");

const config = convict({
    JWT_TOKEN: {
        SECRET:{
          doc: 'Holds the JWT secret',
          format: String,
          default: '$2a$10$e.oPc.dyrwRoQCpDvO9Rhe'
        },
        ExpireTime: {
          doc: 'Holds the JWT Token Expiration Time',
          format: String,
          default: '1d'
        },
    }
})

module.exports = config;