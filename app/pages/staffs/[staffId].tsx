import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStaff from "app/staff/queries/getStaff"
import deleteStaff from "app/staff/mutations/deleteStaff"

export const Staff = () => {
  const router = useRouter()
  const staffId = useParam("staffId", "number")
  const [deleteStaffMutation] = useMutation(deleteStaff)
  const [staff, { refetch }] = useQuery(getStaff, { id: staffId })

  return (
    <>
      <Head>
        <title>Staff {staff.id}</title>
      </Head>

      <div>
        {console.debug(`staff: ${JSON.stringify(staff)}`)}
        {/* <h1>Staff {staff.staff[0].id}</h1> */}
        {/* <pre>{JSON.stringify(staff, null, 2)}</pre> */}
        <h1>スタッフID: {staff.id}</h1>
        <ul>
          <li>氏名: {staff.name}</li>
          <li>単価: {staff.cost}</li>
          <li>稼働率: {staff.utilization}</li>
        </ul>
        {/*
        <ul>
          {StaffsList.map((staff) => {
            <li key={staff.id}>
              {staff.name} : {staff.cost}
            </li>
          })}
        </ul>
        */}
        <Link href={Routes.EditStaffPage({ staffId: staff.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteStaffMutation({ id: staff.id })
              router.push(Routes.StaffPage())
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

const ShowStaffPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.StaffPage()}>
          <a>Staff</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Staff />
      </Suspense>
    </div>
  )
}

ShowStaffPage.authenticate = true
ShowStaffPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowStaffPage
