import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createStaff from "app/staff/mutations/createStaff"
import { StaffForm, FORM_ERROR } from "app/staff/components/StaffForm"

const NewStaffPage: BlitzPage = () => {
  const router = useRouter()
  const [createStaffMutation] = useMutation(createStaff)

  return (
    <div>
      <h1>Create New Staff</h1>

      <StaffForm
        submitText="Create Staff"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateStaff}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            console.log(`values : ${JSON.stringify(values)}`)
            const staff = await createStaffMutation(values)
            router.push(Routes.ShowStaffPage({ staffId: staff.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.StaffPage()}>
          <a>Staff</a>
        </Link>
      </p>
    </div>
  )
}

NewStaffPage.authenticate = true
NewStaffPage.getLayout = (page) => <Layout title={"Create New Staff"}>{page}</Layout>

export default NewStaffPage
