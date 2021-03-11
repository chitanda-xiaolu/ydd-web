module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    //model create
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        console.log(req.body)
        res.send(model)
    })

    //model delete
    router.delete('/:id', async (req, res)=> {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
        console.log(`delete${model}`)
    })

    //model list
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === "Category") {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    //model ditail
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //model edit
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        console.log(req.body)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', async(req, res, next) => {
        //动态获取数据模型
        const modelName = require('inflection').classify(req.params.resource)
        console.log(modelName)
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)


    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', upload.single('file'),async(req,res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}