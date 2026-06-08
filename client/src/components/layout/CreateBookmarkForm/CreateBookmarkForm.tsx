import { useBookmarksStore } from "@/stores";
import { useCreateForm } from "@/hooks";
import { FormikForm, FormikField } from "@/components/shared";
import "./styles.scss";

export const CreateBookmarkForm = () => {
  const formik = useCreateForm();
  const formState = useBookmarksStore((s) => s.formState);
  const closeForm = useBookmarksStore((s) => s.closeForm);

  if (formState === "close") return null;

  return (
    <>
      <FormikForm
        formik={formik}
        className="create-form"
        submitLabel="Add Bookmark"
        submittingLabel="Adding..."
      >
        <button onClick={() => closeForm()}>X</button>

        <FormikField
          className="create-form"
          inputName="title"
          errorName="title"
          type="text"
          label="Title"
        />

        <FormikField
          as="textarea"
          className="create-form"
          inputName="description"
          errorName="description"
          label="Description"
        />

        <FormikField
          className="create-form"
          inputName="url"
          errorName="url"
          type="text"
          label="Website URL"
        />

        <FormikField
          className="create-form"
          inputName="tags"
          errorName="tags"
          type="text"
          label="Tags"
        />
      </FormikForm>

      <div className="home__backdrop"></div>
    </>
  );
};
