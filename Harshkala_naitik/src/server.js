// Importing required modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const cookieSession = require('cookie-session');
const multer = require('multer');
const dbConnect = require('./config/db/dbConnect');
const passportStrategy = require('./passport');

// Initializing express app
const app = express();


//ROUTES
const authRoutes = require('./route/User/authRoute');
const userRoutes = require('./route/User/UserRoutes');
const otpRoutes = require('./route/User/OtpRoute');
const categoryRoutes = require('./route/Category/CategoryRoute');
const productRoutes = require('./route/Product/ProductRoutes');
const initialDataRoutes = require('./route/InitialData/InitialDataRoute');
const cartRoutes = require('./route/Cart/CartRoute');
const orderRoutes = require('./route/Order/OrderRoute');
const paymentRoutes = require('./route/Payment/PaymentRoutes');
const adminRoutes = require('./route/Admin/AdminRoutes');
const couponRoutes = require('./route/Coupon/CouponRoute');
const attributeRoutes = require('./route/Atributes/AttributeRoute');
const giftBoxRoutes = require('./route/GiftBox/GiftBoxRoute');
const giftCardRoutes = require('./route/GiftCards/GiftCardRoute');
const notificationRoutes = require('./route/Notifications/Notifications');
const homecategoryRoutes = require('./route/HomeCategory/HomeCategory');

// Connecting to the database
dbConnect();
// Configuring environment variables
dotenv.config();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Configuring user cookies
app.use(
    cookieSession({
        name: 'session',
        keys: ['hasthkala'],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Configuring Multer for file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Routes setup
// app.use('/', (req, res) => {
//     // Default route to check server status
//     res.status(200).json({ message: 'Hasthkala server is working fine👌.' });
// });

// API routes
app.use('/api', userRoutes);
app.use('/api', otpRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);
app.use('/api', adminRoutes);
app.use('/api', attributeRoutes);
app.use('/api', couponRoutes);
app.use('/api', giftBoxRoutes);
app.use('/api', giftCardRoutes);
app.use('/api', homecategoryRoutes);
app.use('/api', notificationRoutes);
app.use('/auth', authRoutes);

// Create server
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
