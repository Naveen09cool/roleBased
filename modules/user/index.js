const service = require('./user-service')

module.exports = function(app){

    app.post('/user/signup',service.signUp),

    app.post('/admin/create_agent',service.createAgent),

    app.get('/admin/list_agent', service.listAllAgent),

    app.get('/admin/agent_Id', service.agentById)

}