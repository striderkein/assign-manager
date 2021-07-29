import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function StaffForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="id" label="ID" placeholder="ID" type="number" />
      <LabeledTextField name="name" label="氏名" placeholder="氏名" />
      <LabeledTextField name="cost" label="単価" placeholder="単価" type="number" />
      <LabeledTextField name="utilization" label="稼働率" placeholder="稼働率" type="number" />
    </Form>
  )
}
