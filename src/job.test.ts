// import { assert, assertEquals } from 'jsr:@std/assert'

import * as Job from './job.ts'

Deno.test('Job Lifecycle', async () => {
    const job = Job.newJob()
    // console.log(await Job.onWaiting(job))
    // console.log(await Job.onTransit(job))
    // console.log(await Job.onComplete(job))
})
