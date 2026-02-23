import { and, eq } from "drizzle-orm";
import { companySchema, userSchema } from "../../db/index.js";
import db from "../../db/config.js";

export const checkForExistingCompanyByEmail = async (email) => {

    let existingCompany = await db.select().from(companySchema).where(eq(companySchema.email, email));

    return existingCompany;
}

export const checkForExistingUserByEmail = async (email) => {
    let existingUser = await db.select().from(userSchema).where(and(eq(userSchema.email, email), eq(userSchema.role, 'company_admin')));
    return existingUser;
}

export const insertIntoCompany = async (company) => {
    let { name, website, description, email } = company;
    let newCompany = await db.insert(companySchema).values({
        name,
        website,
        description,
        email,
    });
    return newCompany;

}

export const insertIntoUser = async (first_name, last_name, email, password, role, company_id) => {
    let user = await db.insert(userSchema).values({
        first_name,
        last_name,
        email,
        password,
        role,
        company_id,
    })

    return user;
}

export const getCompanyByEmail = async (email) => {
    let company = await db.select().from(companySchema).where(eq(companySchema.email, email));
    return company;
}

export const checkForExistingAdmin = async (email) => {
    let existingAdmin = await db.select().from(userSchema).where(and(eq(userSchema.email, email), eq(userSchema.role, 'company_admin')));
    return existingAdmin;
}