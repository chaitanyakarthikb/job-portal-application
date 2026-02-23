export const adminLoginReqBodyValidator = async (req, res, next) => {
    const { email, password, companyEmail } = req.body;

    if (!email || !password || !companyEmail) {
        return res.status(400).json({
            message: "Email and password are mandatory",
        })
    }

    next();
}