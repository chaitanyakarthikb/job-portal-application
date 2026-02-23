import "dotenv/config";
import express from "express";
import authRouter from "./Routes/auth.route.js";
import { adminRouter } from "./Routes/admin.route.js";
import { adminSignUpRouter } from "./Routes/adminSignUp.route.js";
import { adminAuthenticationCheck } from "./middleware/adminAuthenticationCheck.middleware.js";

const app = express();
let portNumber = process.env.PORT_NUMBER || 3000;

app.use(express.json());
app.use('/auth/admin', adminSignUpRouter);
app.use('/auth', authRouter);
app.use('/admin', adminAuthenticationCheck, adminRouter);

app.listen(portNumber, () => {
    console.log(`Server is running on port ${portNumber}`);
});

