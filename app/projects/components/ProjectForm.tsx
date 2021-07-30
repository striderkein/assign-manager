import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ProjectForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="案件名" placeholder="案件名" />
      <LabeledTextField name="budget" label="金額" placeholder="金額" type="number" />
      <LabeledTextField name="start" label="期間（開始）" placeholder="期間（開始）" type="date" />
      <LabeledTextField name="end" label="期間（終了）" placeholder="期間（終了）" type="date" />
    </Form>
  )
}
