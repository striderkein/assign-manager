import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteStaff = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteStaff), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const staff = await db.staff.deleteMany({ where: { id } })

  return staff
})
