module.exports = function(app){
    require('../modules/admin/index')(app)
    require('../modules/auth/index')(app)
    // require('../modules/sites/index')(app)
    // require('../modules/stores/index')(app)
    // require('../modules/users/index')(app)
}