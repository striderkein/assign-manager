import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStaff from "app/staff/queries/getStaff"

const ITEMS_PER_PAGE = 100

export const StaffList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ staff, hasMore }] = usePaginatedQuery(getStaff, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {staff.map((staff) => (
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

const StaffPage: BlitzPage = () => {
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
          <StaffList />
        </Suspense>
      </div>
    </>
  )
}

StaffPage.authenticate = true
StaffPage.getLayout = (page) => <Layout>{page}</Layout>

export default StaffPage
