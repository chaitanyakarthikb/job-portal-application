import jwt from 'jsonwebtoken';

export const adminAuthenticationCheck = async (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    if (!token) {
        return res.status(400).send("Token not found");
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
        return res.status(400).send("Invalid token");
    }
    if (decodedToken?.role === 'company_admin') {
        req.user = decodedToken;
    }
    next();
}