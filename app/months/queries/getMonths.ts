import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetMonthsInput
  extends Pick<Prisma.MonthFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMonthsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: months,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.month.count({ where }),
      query: (paginateArgs) => db.month.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      months,
      nextPage,
      hasMore,
      count,
    }
  }
)
