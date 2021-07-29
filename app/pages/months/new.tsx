import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createMonth from "app/months/mutations/createMonth"
import { MonthForm, FORM_ERROR } from "app/months/components/MonthForm"

const NewMonthPage: BlitzPage = () => {
  const router = useRouter()
  const [createMonthMutation] = useMutation(createMonth)

  return (
    <div>
      <h1>Create New Month</h1>

      <MonthForm
        submitText="Create Month"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateMonth}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const month = await createMonthMutation(values)
            router.push(Routes.ShowMonthPage({ monthId: month.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.MonthsPage()}>
          <a>Months</a>
        </Link>
      </p>
    </div>
  )
}

NewMonthPage.authenticate = true
NewMonthPage.getLayout = (page) => <Layout title={"Create New Month"}>{page}</Layout>

export default NewMonthPage
