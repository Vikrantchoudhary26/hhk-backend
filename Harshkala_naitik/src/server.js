const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const dbConnect = require('./config/db/dbConnect');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportStrategy = require('./passport');
const multer = require('multer');

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

//dotenv
dotenv.config();
const app = express();
const whitelist = [
    'https://admin.hhkgifts.com',
    'https://backend.hhkgifts.com',
    'https://hhkgifts.com',
    'http://localhost:3002',
    'http://localhost:3001',
    'http://localhost:3000',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

// cors
app.use(cors());
// dbConnect
dbConnect();

// Middleware
app.use(express.json({ limit: '50mb', type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Users cookies
app.use(
    cookieSession({
        name: 'session',
        keys: ['hasthkala'],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Multer upload to a dedicated folder
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
// app.use(upload.single('imageFile'));

// Routes
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

// Create HTTP server
const PORT = process.env.PORT || 5500;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
