import styles from "./FormField.module.scss";
import { Field, ErrorMessage } from "formik";

type InputType = React.InputHTMLAttributes<HTMLInputElement>["type"];
type FormFieldProps = {
  className: string;
  id: string;
  label: string;
  as?: "input" | "textarea";
  type?: InputType;
  placeholder?: string;
};

export const FormField = ({
  className,
  id,
  label,
  as = "input",
  type = "text",
  placeholder,
}: FormFieldProps) => {
  return (
    <div className={`${className} ${styles.formField}`} data-form="field">
      <label htmlFor={id} data-form="label">
        {label}
      </label>

      <Field
        className={styles.formField__input}
        id={id}
        name={id}
        data-form={as === "input" ? "input" : "textarea"}
        as={as}
        {...(as === "input" && { type, placeholder })}
      />

      <ErrorMessage
        className={styles.formField__error}
        name={id}
        component="div"
        data-form="error"
      />
    </div>
  );
};
