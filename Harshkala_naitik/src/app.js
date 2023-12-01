const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const passport = require('passport');
const cookieSession = require("cookie-session");
const passportStrategy = require('./passport');const multer = require('multer');
const upload = multer({ dest: 'uploads/' });




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
const giftBoxRoutes = require('./route/GiftBox/GiftBoxRoute')
const giftCardRoutes = require('./route/GiftCards/GiftCardRoute');
const notificationRoutes = require('./route/Notifications/Notifications');
const homecategoryRoutes = require('./route/HomeCategory/HomeCategory');

// const shiprocketRoutes = require('./route/shiprocket/shiprocket');


//dotenv
dotenv.config();
const app = express();

// dbConnect
dbConnect();

app.use(express.json());

//Users cookies
app.use(
    cookieSession({
        name:"session",
        keys:["hasthkala"],
        maxAge: 24*60*60*100,
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(upload.single('imageFile'));
//cors
app.use(
	cors({
		// origin: ['https://admin.hhkgifts.com','https://hhkgifts.com'],
        origin: ['http://localhost:3002', 'http://localhost:3001', 'http://localhost:3000'],
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use(bodyParse());
app.use(bodyParse.json({limit: '50mb', type: 'application/json'}));


app.use("/api", userRoutes);
app.use("/api", otpRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);
app.use("/api", adminRoutes);
app.use("/api", attributeRoutes);
app.use("/api",couponRoutes);
app.use("/api",giftBoxRoutes);
app.use("/api",giftCardRoutes);
app.use("/api",homecategoryRoutes);
app.use("/api",notificationRoutes);
app.use("/auth",authRoutes);

// app.use('/shiprocket', shiprocketRoutes);


module.exports = app;
