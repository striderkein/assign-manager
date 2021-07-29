import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMonths from "app/months/queries/getMonths"

const ITEMS_PER_PAGE = 100

export const MonthsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ months, hasMore }] = usePaginatedQuery(getMonths, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {months.map((month) => (
          <li key={month.id}>
            <Link href={Routes.ShowMonthPage({ monthId: month.id })}>
              <a>{month.name}</a>
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

const MonthsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Months</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewMonthPage()}>
            <a>Create Month</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <MonthsList />
        </Suspense>
      </div>
    </>
  )
}

MonthsPage.authenticate = true
MonthsPage.getLayout = (page) => <Layout>{page}</Layout>

export default MonthsPage
