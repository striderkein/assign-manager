import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateMonth = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateMonth),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const month = await db.month.update({ where: { id }, data })

    return month
  }
)
