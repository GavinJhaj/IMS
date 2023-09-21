const path=require('path');
const express=require('express');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser')
dotenv.config();
const connectDB=require('./config/db');
const cors=require('cors');

//route import form another file
// const HomeRoutes = require('./routes/HomeRoute');
const ProductRoutes=require('./routes/PlayerRoute');
const UserRoutes=require('./routes/UserRoute');
const UploadRoutes=require('./routes/UploadRoute');
const ContactRoutes=require('./routes/ContactRoute');

const {notFound,errorHandler}=require('./middleware/errorMiddleware')


const port = process.env.PORT || 5000;


connectDB();
const app = express();
app.use(express.static('view'));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



//All routes 

// app.use('/', HomeRoutes);

app.use('/api/products',ProductRoutes);

app.use('/api/contactus',ContactRoutes);

app.use('/api/users',UserRoutes);

app.use('/api/upload',UploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID})
);

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
console.log(path.join(__dirname, '../uploads'))





app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});
