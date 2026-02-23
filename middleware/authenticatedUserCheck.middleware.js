import jwt from 'jsonwebtoken';

export const authenticatedUserCheck = async (req, res, next) => {


    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.send(400).send({ message: "No Token Found" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (decodedToken.role.toLowerCase() === 'admin') {
            req.user = decodedToken;
            return next();
        }
        return res.status(400).send({ message: "You are not authorized to access admin router" });
    } catch (error) {
        return res.status(400).send({ message: "Invalid Token" });
    }

}