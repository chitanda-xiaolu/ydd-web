module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require("http-assert")
    const AdminUser = require('../models/AdminUser')
    return async (req, res, nest) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, 'token已失效或已过期，请重新登录')
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, 'authentication failed')
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, 'authentication failed')
        await nest()
    }
}