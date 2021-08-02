import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAssign from "app/assigns/queries/getAssign"
import deleteAssign from "app/assigns/mutations/deleteAssign"
import updateStaf from "app/staff/mutations/updateStaff"

export const Assign = () => {
  const router = useRouter()
  const assignId = useParam("assignId", "number")
  const [deleteAssignMutation] = useMutation(deleteAssign)
  const [assign, { refetch }] = useQuery(getAssign, { id: assignId })
  const [updateStaffMutation] = useMutation(updateStaf)

  const handleUtilization = async (id: number) => {
    try {
      await updateStaffMutation({ id })
      refetch()
    } catch (error) {
      alert("Error updating staff " + JSON.stringify(error, null, 2))
    }
  }

  return (
    <>
      <Head>
        <title>Assign {assign.id}</title>
      </Head>

      <div>
        <h1>Assign {assign.id}</h1>
        <pre>{JSON.stringify(assign, null, 2)}</pre>
        {assign.staffs.map((staff) => (
          <li key={staff.id}>
            <button onClick={() => handleUtilization(staff.id)}>稼働率アップ</button>
          </li>
        ))}

        <Link href={Routes.EditAssignPage({ assignId: assign.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAssignMutation({ id: assign.id })
              router.push(Routes.AssignsPage())
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

const ShowAssignPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.AssignsPage()}>
          <a>Assigns</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Assign />
      </Suspense>
    </div>
  )
}

ShowAssignPage.authenticate = true
ShowAssignPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAssignPage
