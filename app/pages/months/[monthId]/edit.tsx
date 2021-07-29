import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMonth from "app/months/queries/getMonth"
import updateMonth from "app/months/mutations/updateMonth"
import { MonthForm, FORM_ERROR } from "app/months/components/MonthForm"

export const EditMonth = () => {
  const router = useRouter()
  const monthId = useParam("monthId", "number")
  const [month, { setQueryData }] = useQuery(
    getMonth,
    { id: monthId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateMonthMutation] = useMutation(updateMonth)

  return (
    <>
      <Head>
        <title>Edit Month {month.id}</title>
      </Head>

      <div>
        <h1>Edit Month {month.id}</h1>
        <pre>{JSON.stringify(month)}</pre>

        <MonthForm
          submitText="Update Month"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateMonth}
          initialValues={month}
          onSubmit={async (values) => {
            try {
              const updated = await updateMonthMutation({
                id: month.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowMonthPage({ monthId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditMonthPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMonth />
      </Suspense>

      <p>
        <Link href={Routes.MonthsPage()}>
          <a>Months</a>
        </Link>
      </p>
    </div>
  )
}

EditMonthPage.authenticate = true
EditMonthPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditMonthPage
