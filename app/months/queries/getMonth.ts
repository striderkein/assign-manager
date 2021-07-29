import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetMonth = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetMonth), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const month = await db.month.findFirst({ where: { id } })

  if (!month) throw new NotFoundError()

  return month
})
