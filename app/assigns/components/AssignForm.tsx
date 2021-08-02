import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useMutation } from "blitz"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Suspense } from "react"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import getStaff from "app/staff/queries/getStaffs"
import getProjects from "app/projects/queries/getProjects"
import updateStaff from "app/staff/mutations/updateStaff"

const ITEMS_PER_PAGE = 100
let selectedProjectId = 0
let totalUtilization = 0

export const StaffsFilteredList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ staffs, hasMore }] = usePaginatedQuery(getStaff, {
    where: { utilization: { lt: 100 } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {staffs.map((staff, i) => (
          <li key={staff.id}>
            <Link href={Routes.ShowStaffPage({ staffId: staff.id })}>
              <a>{staff.name}</a>
            </Link>
            <span>: 稼働率: {staff.utilization} %</span>
            <button onClick={(e) => handleUtilization(e, staff.id, this)}>increment</button>
            <button>assign</button>
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

const ProjectsSelectBox = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div>
      <select onChange={(e) => setProject(Number(e.target.value))} defaultValue="0">
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  )
}

const handleUtilization = async (e, staffId: number, assign) => {
  // TODO: impl
  e.preventDefault()
  // const [updateStaffMutation] = useMutation(updateStaff)

  console.debug(`increment clicked! staffId: ${staffId}, assign: ${assign}`)
  try {
    // await updateStaffMutation({ id: staffId })
    // TODO: impl
    console.debug(`staff-ID: ${staffId}`)
  } catch (error) {
    alert("Error updating staff " + JSON.stringify(error, null, 2))
  }
  totalUtilization++
  console.debug(`totalUtilization: ${totalUtilization}`)
}

const setProject = async (id: number) => {
  try {
    // TODO: impl
    console.debug(`project-id: ${id}`)
    selectedProjectId = id
  } catch (error) {
    alert("Error set project " + JSON.stringify(error, null, 2))
  }
}

export function AssignForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="start" label="期間（開始）" placeholder="YYYY-MM-DD" />
      <LabeledTextField name="end" label="期間（終了）" placeholder="YYYY-MM-DD" />
      <LabeledTextField name="utilization" label="稼働率（%）" placeholder="50" type="number" />
      {/*
      <LabeledTextField
        name="staffs.0.name"
        label="アサインスタッフ"
        placeholder="山田太郎"
        type="number"
      />
      */}
      <ul>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsSelectBox />
        </Suspense>
      </ul>
      <ul>
        <Suspense fallback={<div>Loading...</div>}>
          <StaffsFilteredList />
        </Suspense>
      </ul>
    </Form>
  )
}
