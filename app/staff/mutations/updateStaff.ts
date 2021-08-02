import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateStaff = z.object({
  id: z.number(),
  // name: z.string(),
  // cost: z.number(),
  utilization: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateStaff),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const staff = await db.staff.update({ where: { id }, data })
    /*
    const staff = await db.staff.update({
      where: { id },
      data: { utilization: { increment: 1 } },
    })
     */

    return staff
  }
)
