import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAssigns from "app/assigns/queries/getAssigns"

const ITEMS_PER_PAGE = 100

export const AssignsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ assigns, hasMore }] = usePaginatedQuery(getAssigns, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {assigns.map((assign) => (
          <li key={assign.id}>
            <Link href={Routes.ShowAssignPage({ assignId: assign.id })}>
              <a>{assign.id}</a>
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

const AssignsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Assigns</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAssignPage()}>
            <a>Create Assign</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AssignsList />
        </Suspense>
      </div>
    </>
  )
}

AssignsPage.authenticate = true
AssignsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AssignsPage
