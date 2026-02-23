import express from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { adminLoginReqBodyValidator } from '../middleware/adminLoginReqBodyValidator.middleware.js';
import { checkForExistingAdmin, checkForExistingCompanyByEmail, checkForExistingUserByEmail, getCompanyByEmail, insertIntoCompany, insertIntoUser } from '../services/adminSignupAndLogin/index.js';

export const adminSignUpRouter = express.Router();


adminSignUpRouter.post('/signup', async (req, res) => {
    const { admin, company } = req.body;

    let existingCompany = await checkForExistingCompanyByEmail(company.email);

    if (existingCompany.length > 0) {
        return res.status(400).send("Company already exists");
    }

    let existingAdminChck = await checkForExistingUserByEmail(admin.email);

    if (existingAdminChck.length > 0) {
        return res.status(400).send("Admin already exists");
    }

    let createdCompany = await insertIntoCompany(company);

    let companyCreatedJustNow = await getCompanyByEmail(company.email);

    if (!createdCompany) {
        return res.status(400).send("Something went wrong creating the company");
    }

    let hashedPassword = await bcrypt.hash(admin.password, 10);

    let createdAdmin = await insertIntoUser(admin.first_name, admin.last_name, admin.email, hashedPassword, 'company_admin', companyCreatedJustNow[0].id);
    if (!createdAdmin) {
        return res.status(400).send("Something went wrong creating the admin");
    }

    return res.send("Admin signup successful")
})

adminSignUpRouter.post('/login', adminLoginReqBodyValidator, async (req, res) => {
    const { email, password, companyEmail } = req.body;

    let checkForExistingCompany = await checkForExistingCompanyByEmail(companyEmail);


    if (checkForExistingCompany.length == 0) {
        return res.status(400).send("Company not found");
    }

    let checkFrExistingAdmin = await checkForExistingAdmin(email);

    if (checkFrExistingAdmin.length == 0) {
        return res.status(400).send("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(password, checkFrExistingAdmin[0].password);

    if (!isPasswordValid) {
        return res.status(400).send("Invalid password!");
    }

    const payload = {
        id: checkFrExistingAdmin[0].id,
        first_name: checkFrExistingAdmin[0].first_name,
        last_name: checkFrExistingAdmin[0].last_name,
        email: checkFrExistingAdmin[0].email,
        role: checkFrExistingAdmin[0].role,
    }

    let secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey);
    if (token) {
        return res.status(200).send({ message: "Succesfully Logged in ", token })
    }
    return res.status(400).send("Something went wrong!");
})