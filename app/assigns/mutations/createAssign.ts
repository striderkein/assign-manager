import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateAssign = z.object({
  // name: z.string(),
  utilization: z.number(),
  start: z.string(),
  end: z.string(),
  // project: z.object({}),
  staffs: z.array(z.object({ id: z.number() })),
})

export default resolver.pipe(resolver.zod(CreateAssign), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const assign = await db.assign.create({
    data: {
      ...input,
      // project: {},
      staffs: { connect: input.staffs },
    },
  })

  return assign
})
