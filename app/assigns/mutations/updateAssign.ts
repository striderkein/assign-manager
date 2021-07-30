import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateAssign = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateAssign),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const assign = await db.assign.update({ where: { id }, data })

    return assign
  }
)
