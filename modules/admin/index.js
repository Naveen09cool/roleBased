const service = require('./admin-service')

module.exports = function(app){

    app.post('/admin/signup',service.signUp),

    app.post('/admin/create_user',service.createUser),

    app.post('/admin/create_user_type',service.createUserType),

    app.get('/admin/list_user', service.listUserByType),

    app.get('/admin/id', service.userById)

    // app.get('/admin/child_id', service.)

}