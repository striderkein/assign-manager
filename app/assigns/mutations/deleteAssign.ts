import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteAssign = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteAssign), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const assign = await db.assign.deleteMany({ where: { id } })

  return assign
})
