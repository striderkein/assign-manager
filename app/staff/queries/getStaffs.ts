import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetStaffInput
  extends Pick<Prisma.StaffFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetStaffInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: staff,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.staff.count({ where }),
      query: (paginateArgs) => db.staff.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      staff,
      nextPage,
      hasMore,
      count,
    }
  }
)
