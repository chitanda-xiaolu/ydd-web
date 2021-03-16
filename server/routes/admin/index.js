module.exports = app => {
    const express = require('express')
    const assert = require("http-assert")
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        mergeParams: true
    })


    //登陆校验中间件
    const authMiddleware = require('../../Middleware/auth')

    //数据模型动态加载中间件
    const resourceMiddleware = require('../../Middleware/resource')

    /**
     * 路由挂载
     */
    //model create
    router.post('/', authMiddleware(),async (req, res) => {
        const model = await req.Model.create(req.body)
        console.log(req.body)
        res.send(model)
    })

    //model delete
    router.delete('/:id', authMiddleware(), async (req, res)=> {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
        console.log(`delete${model}`)
    })

    //model list
    router.get('/', authMiddleware(), async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === "Category") {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    //model ditail
    router.get('/:id', authMiddleware(),async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    }) 

    //model edit
    router.put('/:id', authMiddleware(),async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        console.log(req.body)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', resourceMiddleware(), router)

    //图片上传
    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads/images'})
    app.post('/admin/api/upload', authMiddleware(),upload.single('file'),async(req,res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/images/${file.filename}`
        res.send(file)
    })

    //文件上传
    const fileUpload = multer({dest: __dirname + '/../../uploads/file'})
    app.post('/admin/api/upload/file', fileUpload.single('file'), async(req, res) => {
        const article = require('../../models/Article')
        console.log(article)
        console.log(`request: ${req}`)
        console.log(req.file)
        const file = req.file
        file.url = `http://localhost:3000/uploads/file/${file.filename}`
        res.send(file)
    })

    //登录接口
    app.post('/admin/api/login', async (req, res) => {
        const { username,password } = req.body
        //1.根据用户名查询用户
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({username})
        console.log(user)
        //用assert代替下列语句块
        // if(!user) {
        //     return res.status(422).send({
        //         message: '用户名不存在'
        //     })
        // }
        assert(user, 422, '用户不存在')
        //2.校验密码
        if (user.password == password) {
            //3.返回token
            const token = jwt.sign({id: user._id}, app.get('secret'))
            res.send({token})
        } else {
            return res.status(422).send({
                message: '用户名或密码错误'
            })
        }       
    })


    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}