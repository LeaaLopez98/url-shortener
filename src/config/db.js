import mongoose from 'mongoose'

mongoose.connect(
  'mongodb://localhost:27017/mydatabase', {})
  .then(() => {
    console.log('Database connected')
  }).catch((err) => {
    console.log(err)
  })
