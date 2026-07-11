import { useFormStore } from "@/stores";
import { useCreateForm } from "@/hooks";
import { FormikForm, FormikField, Icon } from "@/components/shared";
import "./styles.scss";

export const CreateBookmarkForm = () => {
  const formik = useCreateForm();
  const createFormState = useFormStore((s) => s.createFormState);
  const setCreateFormState = useFormStore((s) => s.setCreateFormState);
  const handleCloseForm = () => setCreateFormState("close");

  if (createFormState === "close") return null;

  return (
    <>
      <div className="bookmark-form">
        <button className="bookmark-form__close" onClick={handleCloseForm}>
          <Icon name="icon-close" />
        </button>

        <div className="bookmark-form__header">
          <h1 className="bookmark-form__title">Add a bookmark</h1>
          <p className="bookmark-form__description">
            Save a link with details to keep your collection organized. We
            extract the favicon automatically from the URL.
          </p>
        </div>

        <FormikForm
          form="create"
          formik={formik}
          className="bookmark-form"
          submitLabel="Add Bookmark"
          submittingLabel="Adding..."
        >
          <div className="bookmark-form__fields">
            <FormikField
              className="bookmark-form"
              inputName="title"
              errorName="title"
              type="text"
              label="Title"
            />

            <FormikField
              as="textarea"
              className="bookmark-form"
              inputName="description"
              errorName="description"
              label="Description"
            />

            <FormikField
              className="bookmark-form"
              inputName="url"
              errorName="url"
              type="text"
              label="Website URL"
            />

            <FormikField
              className="bookmark-form"
              inputName="tags"
              errorName="tags"
              type="text"
              label="Tags"
              placeholder="e.g. Design, Learning, Tools"
            />
          </div>
        </FormikForm>
      </div>

      <div className="home__backdrop"></div>
    </>
  );
};
