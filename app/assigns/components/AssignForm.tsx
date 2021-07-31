import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { StaffsList } from "app/pages/staffs"
import { Suspense } from "react"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function AssignForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="start" label="期間（開始）" placeholder="期間（開始）" />
      <LabeledTextField name="end" label="期間（終了）" placeholder="期間（終了）" />
      <LabeledTextField name="utilization" label="稼働率" placeholder="稼働率" type="number" />
      <LabeledTextField
        name="staffs.0.name"
        label="アサインスタッフ"
        placeholder="アサインスタッフ"
        type="number"
      />
      <ul>
        {/* <li><input type="checkbox">{StaffsList[0]}</input></li> */}
        <Suspense fallback={<div>Loading...</div>}>
          <StaffsList />
        </Suspense>
      </ul>
    </Form>
  )
}
