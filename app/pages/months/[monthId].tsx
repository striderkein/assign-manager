import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMonth from "app/months/queries/getMonth"
import deleteMonth from "app/months/mutations/deleteMonth"

export const Month = () => {
  const router = useRouter()
  const monthId = useParam("monthId", "number")
  const [deleteMonthMutation] = useMutation(deleteMonth)
  const [month] = useQuery(getMonth, { id: monthId })

  return (
    <>
      <Head>
        <title>Month {month.id}</title>
      </Head>

      <div>
        <h1>Month {month.id}</h1>
        <pre>{JSON.stringify(month, null, 2)}</pre>

        <Link href={Routes.EditMonthPage({ monthId: month.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteMonthMutation({ id: month.id })
              router.push(Routes.MonthsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowMonthPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.MonthsPage()}>
          <a>Months</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Month />
      </Suspense>
    </div>
  )
}

ShowMonthPage.authenticate = true
ShowMonthPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowMonthPage
