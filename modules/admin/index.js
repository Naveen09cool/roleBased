const service = require('./admin-service')

module.exports = function(app){

    app.post('/admin/signup',service.signUp),
    
    app.post('/admin/create_agent',service.createAgent)

}