import { ErrorMessage, Field } from "formik";

type BaseFieldProps = {
  className: string;
  inputName: string;
  errorName: string;
  placeholder?: string;
  label: string;
};

type InputType = React.InputHTMLAttributes<HTMLInputElement>["type"];

type FormikFieldProps =
  | ({ as?: "input"; type: InputType } & BaseFieldProps)
  | ({ as: "textarea" } & BaseFieldProps);

export const FormikField = (props: FormikFieldProps) => {
  const classes = {
    field: `${props.className}__field`,
    label: `${props.className}__label`,
    input: `${props.className}__input`,
    error: `${props.className}__error`,
  };

  return (
    <div className={classes["field"]}>
      <label htmlFor={props.inputName} className={classes["label"]}>
        {props.label}
      </label>

      <Field
        className={classes["input"]}
        id={props.inputName}
        name={props.inputName}
        type={props.as === "input" ? props.type : undefined}
        placeholder={props.placeholder}
        as={props.as === "textarea" ? "textarea" : "input"}
      />

      <ErrorMessage
        name={props.errorName}
        component="div"
        className={classes["error"]}
      />
    </div>
  );
};
