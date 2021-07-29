import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteMonth = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteMonth), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const month = await db.month.deleteMany({ where: { id } })

  return month
})
