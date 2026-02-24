import express from 'express';
import { createJob, getAllJobsByCompanyId, getJobByIdandCompanyId } from '../services/jobsCrud/index.js';


export const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    return res.send("you are authenticated to use adminRouter");
})

adminRouter.post('/post-job', async (req, res) => {
    const { title, status, description, salary, location } = req.body;

    let company_id = req.user.company_id;

    const createdJob = await createJob(title, status, description, salary, location, company_id);

    if (!createdJob) {
        return res.status(400).send("Something went wrong creating the job");
    }

    return res.status(201).send("Job posted successfully");
})

adminRouter.get('/jobs', async (req, res) => {
    let company_id = req.user.company_id;

    let jobs = await getAllJobsByCompanyId(company_id);
    if (!jobs) {
        return res.status(400).send("Something went wrong fetching the jobs");
    }
    if (jobs.length == 0) {
        return res.status(400).send("No jobs found");
    }
    return res.status(200).send(jobs);
})

adminRouter.get('/jobs/:id', async (req, res) => {
    let id = req.params.id;
    let company_id = req.user.company_id;
    let job = await getJobByIdandCompanyId(id, company_id)

    if (!job) {
        return res.status(400).send("Job not found");
    }
    return res.status(200).send(job);
})