const express = require('express')
const app = express()
const path=require('path')
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')
const { mongourl } = require('./keys')
mongoose.connect(mongourl)
require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/createPost'))
app.use(require('./routes/user'))



mongoose.connection.on("connected", () => {
    console.log('success');
})
mongoose.connection.on("error", () => {
    console.log(' not success');
})


// serving the frontend



app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./frontend/build/index.html"),
        function(err)
        {
            res.status(500).send(err)
        }
    )
})


app.listen(port, () => {
    console.log('server is running on port ' + port);
})

// var server = app.listen(process.env.PORT || 8081, () => {
//     console.log('Server is started on 127.0.0.1:'+ (process.env.PORT || 8081))
// })