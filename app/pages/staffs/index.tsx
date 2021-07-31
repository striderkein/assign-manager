import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStaff from "app/staff/queries/getStaffs"

const ITEMS_PER_PAGE = 100

export const StaffsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ staffs, hasMore }] = usePaginatedQuery(getStaff, {
    // FIXME: ここに where を書いてしまうと「スタッフ一覧」表示にも反映されてしまう
    where: { utilization: { lt: 100 } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {staffs.map((staff) => (
          <li key={staff.id}>
            <Link href={Routes.ShowStaffPage({ staffId: staff.id })}>
              <a>{staff.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const StaffsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Staff</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewStaffPage()}>
            <a>Create Staff</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <StaffsList />
        </Suspense>
      </div>
    </>
  )
}

StaffsPage.authenticate = true
StaffsPage.getLayout = (page) => <Layout>{page}</Layout>

export default StaffsPage
