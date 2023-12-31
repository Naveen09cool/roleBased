const bodyParser = require('body-parser')
const config = require('../configurations/config')
const constants = require('../utils/constants')
const jwt  = require('jsonwebtoken')
const sqlInstance = require('../database/index')


module.exports = function(app){
 // Enable request body parsing
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // Enable request body parsing in JSON format
  app.use(bodyParser.json({
  }))
   // verify token
   app.use( verifyToken, function (req, res, next) {
    if (req.isAuthenticatedUser) {
      next()
    } else {
      return res.status(constants.httpStatusCode.success).send({
        code: constants.responseCodes.unauthorizedAccess,
        message: constants.messageKeys.en.msg_unauthorized_user
      })
    }
  }) 

}

 const verifyToken = (req ,res , next) => {
    /*For private routes */
    if(req.headers.authorization && constants.publicAPI.indexOf(req.path) < 0){
      console.log("Inside public private");
      const token = req.headers.authorization
      const userId = jwt.decode(token) ? jwt.decode(token).user_id : ""
      if(userId){
        checkValidUserToken(token , userId , req , next)
      }else{
        req.isAuthenticatedUser = false
        next()
      }       
      }

      /*For public routes */
      else if(constants.publicAPI.indexOf(req.path) >= 0){
        console.log("Inside public route" , req.headers.authorization);
        console.log(constants.publicAccessToken.token ,">>>>>>>>>>>>>>>>>>");
        if(req.headers.authorization === constants.publicAccessToken.token){
          req.isAuthenticatedUser = true
          next()
        }else{
          req.isAuthenticatedUser = false
          next()
        }
      }else {
      req.isAuthenticatedUser = false
      next()
    }

}


const checkValidUserToken = async(token , userId , req , next) => {
  if(token){
  const status =  await verifyUserToken(token)
  if(status === constants.httpStatusCode.success){
    let userDetails = await sqlInstance.sequelize.models.users.findOne({
      where:{
        user_id: userId
      }
    },{
      raw: true
    })
    if(userDetails.is_verified) {
      req.isAuthenticatedUser = true
      userDetails = JSON.parse(JSON.stringify(userDetails))
      delete userDetails.password
      req.user = userDetails
      next()
    }else{
      req.isAuthenticatedUser = false
      next()
    }
  }
  }else{
    req.isAuthenticatedUser =false
    next()
  }
}


const verifyUserToken = async (token) => {
 const payload = await jwt.verify(token ,config.get("JWT_TOKEN.SECRET"), { expiresIn:  config.get('JWT_TOKEN.ExpireTime')} )
 if(payload){
    return (null, constants.httpStatusCode.success)
  }else{
   return (constants.messageKeys.en.msg_session_expired, constants.httpStatusCode.forbidden)
  }

}