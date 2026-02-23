import express from 'express';
import { signupReqBodyValidator } from '../middleware/signupReqBodyValidator.middleware.js';
import db from '../db/config.js';
import bcrypt from 'bcrypt';
import { userSchema } from '../db/userSchema.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { loginReqBodyValidator } from '../middleware/loginReqBodyValidator.middleware.js';
const authRouter = express.Router();

authRouter.post('/signup', signupReqBodyValidator, async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;


    let existingUser = await db.select().from(userSchema).where(eq(userSchema.email, email));




    if (existingUser.length > 0) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.insert(userSchema).values({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role: role,
    });

    return res.status(201).json({
        message: "User created successfully",
        user: newUser,
    });
})


authRouter.post('/login', loginReqBodyValidator, async (req, res) => {

    let { email, password } = req.body;
    let user = await db.select().from(userSchema).where(eq(userSchema.email, email));

    if (!user) {
        return res.status(400).send("User not found!");
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
        return res.status(400).send("Invalid password!");
    }


    const payload = {
        id: user[0].id,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        email: user[0].email,
        role: user[0].role,
    }

    let secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey);
    if (token) {
        return res.status(200).send({ message: "Succesfully Logged in ", token })
    }
    return res.status(400).send("Something went wrong!");
})

export default authRouter;