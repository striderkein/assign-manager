import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateStaff = z.object({
  name: z.string(),
  cost: z.number(),
})

export default resolver.pipe(resolver.zod(CreateStaff), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const staff = await db.staff.create({
    data: {
      ...input,
      // cost: { create: input.cost },
    },
  })

  return staff
})
