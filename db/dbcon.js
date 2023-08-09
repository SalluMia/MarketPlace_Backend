const mongoose= require('mongoose')

mongoose.connect(process.env.Mongo_URI)

.then(()=>{
    console.log('Connection established')
})
.catch((error)=>{
     console.log(error)
})