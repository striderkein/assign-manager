import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAssign from "app/assigns/queries/getAssign"
import updateAssign from "app/assigns/mutations/updateAssign"
import { AssignForm, FORM_ERROR } from "app/assigns/components/AssignForm"

export const EditAssign = () => {
  const router = useRouter()
  const assignId = useParam("assignId", "number")
  const [assign, { setQueryData }] = useQuery(
    getAssign,
    { id: assignId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAssignMutation] = useMutation(updateAssign)

  return (
    <>
      <Head>
        <title>Edit Assign {assign.id}</title>
      </Head>

      <div>
        <h1>Edit Assign {assign.id}</h1>
        <pre>{JSON.stringify(assign)}</pre>

        <AssignForm
          submitText="Update Assign"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAssign}
          initialValues={assign}
          onSubmit={async (values) => {
            try {
              const updated = await updateAssignMutation({
                id: assign.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowAssignPage({ assignId: updated.id }))
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

const EditAssignPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAssign />
      </Suspense>

      <p>
        <Link href={Routes.AssignsPage()}>
          <a>Assigns</a>
        </Link>
      </p>
    </div>
  )
}

EditAssignPage.authenticate = true
EditAssignPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAssignPage
