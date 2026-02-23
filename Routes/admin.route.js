import express from 'express';


export const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    return res.send("you are authenticated to use adminRouter");
})