require('./db/mongoose')
const express=require('express')
const Tester=require('./models/tester')
const path=require('path')
const viewsPath=path.join(__dirname,'/views')
const bodyParser = require('body-parser')


const testerRouter=require('./routers/tester')

const app=express()
const port=process.env.PORT || 3000

// app.use((req,res,next)=>{

//  next()
// })
app.set('view engine','ejs')
app.set('views',viewsPath)
//app.use(express.json())    //it n  will automatically parse incoming json to an object
app.use(bodyParser.urlencoded({ extended: false }))

app.use(testerRouter)
//app.use(bodyParser.json())

app.listen(port,()=>{
    console.log('Server is up on port ' +port)
})

