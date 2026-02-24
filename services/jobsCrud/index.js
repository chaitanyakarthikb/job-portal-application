import { jobSchema } from "../../db/jobSchema.js"
import db from "../../db/config.js"
import { and, eq } from "drizzle-orm";

export const createJob = async (title, status, description, salary, location, company_id) => {
    const job = await db.insert(jobSchema).values({
        title,
        status,
        description,
        salary,
        location,
        company_id,
    })
    return job;
}

export const getAllJobsByCompanyId = async (company_id) => {
    let jobs = await db.select().from(jobSchema).where(eq(jobSchema.company_id, company_id));
    return jobs;
}

export const getJobByIdandCompanyId = async (job_id, company_id) => {
    let job = await db.select().from(jobSchema).where(and(eq(jobSchema.id, job_id), eq(jobSchema.company_id, company_id)));
    return job;
}