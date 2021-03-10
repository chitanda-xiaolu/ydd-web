module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')

    //新建分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        console.log(req.body)
        res.send(model)
    })

    //删除分类
    router.delete('/categories/:id', async (res, req)=> {
        
    })

    //分类列表
    router.get('/categories', async (req, res) => {
        const items = await Category.find().limit(10)
        console.log(items)
        res.send(items)
    })

    //分类信息详情
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })

    //编辑分类信息
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        console.log(req.body)
        res.send(model)
    })

    app.use('/admin/api', router)
}