import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStaff from "app/staff/queries/getStaffs"
import updateStaff from "app/staff/mutations/updateStaff"
import { StaffForm, FORM_ERROR } from "app/staff/components/StaffForm"

export const EditStaff = () => {
  const router = useRouter()
  const staffId = useParam("staffId", "number")
  const [staff, { setQueryData }] = useQuery(
    getStaff,
    { id: staffId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateStaffMutation] = useMutation(updateStaff)

  return (
    <>
      <Head>
        <title>Edit Staff {staff.id}</title>
      </Head>

      <div>
        <h1>Edit Staff {staff.id}</h1>
        {/* <pre>{JSON.stringify(staff)}</pre> */}

        <StaffForm
          submitText="Update Staff"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateStaff}
          initialValues={staff}
          onSubmit={async (values) => {
            try {
              const updated = await updateStaffMutation({
                id: staff.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowStaffPage({ staffId: updated.id }))
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

const EditStaffPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditStaff />
      </Suspense>

      <p>
        <Link href={Routes.StaffsPage()}>
          <a>Staff</a>
        </Link>
      </p>
    </div>
  )
}

EditStaffPage.authenticate = true
EditStaffPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditStaffPage
