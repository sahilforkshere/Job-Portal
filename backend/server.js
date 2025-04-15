import app from './app.js'
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({path:'./config/config.env'})
import mongoose from 'mongoose';

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  
  mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection error:', err.message);
    process.exit(1); // Exit the process if the database connection fails
  });
  
  console.log('Cloudinary configured:', process.env.CLOUDINARY_CLIENT_NAME);

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET
    
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    
})