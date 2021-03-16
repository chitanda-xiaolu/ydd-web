module.exports = options => {
    return async (req, res, next) => {
        //动态获取数据模型
        const modelName = require('inflection').classify(req.params.resource)
        console.log(modelName)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}