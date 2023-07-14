const service = require('./admin-service')

module.exports = function(app){

    app.post('/admin/signup',service.signUp)

}