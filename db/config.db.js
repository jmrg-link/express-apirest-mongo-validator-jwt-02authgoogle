const mongoose = require('mongoose')

const dbConnecetion = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log('MongoDB connected successfully')
    } catch (err) {
        console.log(err)
        throw new Error('Error al conectar con DBMongo ')
    }

}

module.exports = {
    dbConnecetion
}
