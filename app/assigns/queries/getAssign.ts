import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAssign = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetAssign), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const assign = await db.assign.findFirst({
    where: { id },
    include: { staffs: true },
  })

  if (!assign) throw new NotFoundError()

  return assign
})
