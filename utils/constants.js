const constants = {
    httpStatusCode: {
      success: 200,
      unauthorised: 401,
      forbidden: 403,
      badRequest: 400
    },
    responseCodes: {
      successfulOperation: 200,
      failedOperation: 500,
      unauthorizedAccess: 401,
      revalidation: 400,
      noContent: 204,
      noEmail: 410,
      dataAlreadyExists: 409
    },
    messageKeys:{
      en: {
      msg_success: 'Successful Operation',
      msg_failed: 'Something went wrong',
      msg_revalidate: 'Schema Validation Failed',
      msg_user_unauthorized_access: 'Unauthorized Access',
      msg_no_data: 'No Data Found',
      msg_usr_already_exits:'User Already Exist',
      msg_session_expired:'User Session Expired', 
      msg_unauthorized_user:'UnAuthorized User',
      msg_data_already_exits:'Data Already Exist',
      msg_ref_error: 'Reference Error',
      msg_usr_type_already_exits:'User Type Already Exist',
     }
   },
  publicAPI:[
    '/user/signup',
    '/user/verify',
    '/user/login',
    '/admin/signup',
  ],
  limit:15,
  publicAccessToken:{
    token:'3ls20684-3fb7-9327-8392-3ps920t92746'
  },
  pagination:{
    deafultPageSize:1000,
    defaultCurrentPage : 1
  }
}

module.exports = constants