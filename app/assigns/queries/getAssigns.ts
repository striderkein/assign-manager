import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAssignsInput
  extends Pick<Prisma.AssignFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAssignsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: assigns,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.assign.count({ where }),
      query: (paginateArgs) => db.assign.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      assigns,
      nextPage,
      hasMore,
      count,
    }
  }
)
