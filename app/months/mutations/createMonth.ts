import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateMonth = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateMonth), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const month = await db.month.create({ data: input })

  return month
})
