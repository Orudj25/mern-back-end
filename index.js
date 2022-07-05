//'mongodb+srv://<username>:<password>@cluster0.dealq.mongodb.net/?retryWrites=true&w=majority'


import express from 'express'
import mongoose from 'mongoose'
import { RegisterValidation, LoginValidation, PostCreateValidation } from "./models/validations/auth.js";
import { UserController,PostController } from './models/controllers/index.js'
import { handleValidationErrors,checkAuth } from "./models/utils/index.js";
import multer from 'multer'

import post from "./models/Post.js";

mongoose
    .connect('mongodb+srv://Ouj:12345oruj@cluster0.dealq.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB is OK'))
    .catch((err) => console.log('DB error',err))

const app = express()

const storage = multer.diskStorage({
    destination:(name1,name2,cb)=> {
        cb(null,'models/uploads')
    },
    filename:(name1,file,cb) =>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

app.use(express.json())

app.post('/auth/login',LoginValidation,handleValidationErrors,UserController.login)
app.post('/auth/register',RegisterValidation,handleValidationErrors,UserController.register)
app.get('/auth/me', checkAuth,UserController.getMe)

app.post('/uploads/',checkAuth,upload.single('image1'),(req,res) => {
    res.json({
        url:`/uploads/${req.file.originalname}`
    })
})

app.get('/posts',PostController.getAll)
app.get('/posts/:id',PostController.getOne)
app.post('/posts',checkAuth,PostCreateValidation,handleValidationErrors,PostController.create)
app.delete('/posts/:id',checkAuth,PostController.remove)
app.patch('/posts/:id',checkAuth,PostCreateValidation,handleValidationErrors,PostController.update)


app.listen(4443,(err)=>{
   if(err){
       return console.log(err)
   }
   console.log('server OK')
})











