import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { StaffsFilteredList } from "app/pages/staffs"
import { Suspense } from "react"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import getProjects from "app/projects/queries/getProjects"

const ITEMS_PER_PAGE = 100

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
      <select onChange={(e) => setProject(Number(e.target.value))}>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  )
}

const setProject = async (id: number) => {
  try {
    // TODO: impl
    console.debug(`project-id: ${id}`)
  } catch (error) {
    alert("Error set project " + JSON.stringify(error, null, 2))
  }
}

export function AssignForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      {/* <LabeledTextField name="start" label="期間（開始）" placeholder="YYYY-MM-DD" /> */}
      {/* <LabeledTextField name="end" label="期間（終了）" placeholder="YYYY-MM-DD" /> */}
      {/* <LabeledTextField name="utilization" label="稼働率（%）" placeholder="50" type="number" /> */}
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
        {/* <li><input type="checkbox">{StaffsList[0]}</input></li> */}
        <Suspense fallback={<div>Loading...</div>}>
          <StaffsFilteredList />
        </Suspense>
      </ul>
    </Form>
  )
}
