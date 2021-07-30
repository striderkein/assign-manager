import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createAssign from "app/assigns/mutations/createAssign"
import { AssignForm, FORM_ERROR } from "app/assigns/components/AssignForm"

const NewAssignPage: BlitzPage = () => {
  const router = useRouter()
  const [createAssignMutation] = useMutation(createAssign)

  return (
    <div>
      <h1>Create New Assign</h1>

      <AssignForm
        submitText="Create Assign"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAssign}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const assign = await createAssignMutation(values)
            router.push(Routes.ShowAssignPage({ assignId: assign.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.AssignsPage()}>
          <a>Assigns</a>
        </Link>
      </p>
    </div>
  )
}

NewAssignPage.authenticate = true
NewAssignPage.getLayout = (page) => <Layout title={"Create New Assign"}>{page}</Layout>

export default NewAssignPage
