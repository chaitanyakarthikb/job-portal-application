export const signupReqBodyValidator = (req, res, next) => {
    const reqBody = req.body;

    const { first_name, last_name, email, password, role } = reqBody;

    if (!first_name || !last_name || !email || !password || !role) {
        return res.status(400).json({
            message: "All fields are mandatory",
        });
    }

    next();
}