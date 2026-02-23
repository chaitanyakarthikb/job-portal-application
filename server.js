import "dotenv/config";
import express from "express";
import authRouter from "./Routes/auth.route.js";
import { adminRouter } from "./Routes/admin.route.js";
import { authenticatedUserCheck } from "./middleware/authenticatedUserCheck.middleware.js";

const app = express();
let portNumber = process.env.PORT_NUMBER || 3000;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/admin', authenticatedUserCheck, adminRouter);

app.listen(portNumber, () => {
    console.log(`Server is running on port ${portNumber}`);
});

