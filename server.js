import "dotenv/config";
import express from "express";
import authRouter from "./Routes/auth.route.js";
import { adminRouter } from "./Routes/admin.route.js";

import { adminAuthenticationCheck } from "./middleware/adminAuthenticationCheck.middleware.js";
import { adminAuthRouter } from "./Routes/adminSignUp.route.js";

const app = express();
let portNumber = process.env.PORT_NUMBER || 3000;

app.use(express.json());
app.use('/auth/admin', adminAuthRouter);
app.use('/admin', adminAuthenticationCheck, adminRouter);

app.listen(portNumber, () => {
    console.log(`Server is running on port ${portNumber}`);
});

