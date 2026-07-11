import { useFormStore } from "@/stores";
import { useUpdateForm } from "@/hooks";
import { FormikForm, FormikField, Icon } from "@/components/shared";
import "./styles.scss";

export const UpdateBookmarkForm = () => {
  const selectedBookmark = useFormStore((s) => s.selectedBookmark);
  const formik = useUpdateForm(selectedBookmark);
  const updateFormState = useFormStore((s) => s.updateFormState);
  const setUpdateFormState = useFormStore((s) => s.setUpdateFormState);
  const handleCloseForm = () => setUpdateFormState("close");

  if (updateFormState === "close" || !formik) return null;

  return (
    <>
      <div className="bookmark-form">
        <button className="bookmark-form__close" onClick={handleCloseForm}>
          <Icon name="icon-close" />
        </button>

        <div className="bookmark-form__header">
          <h1 className="bookmark-form__title">Update bookmark</h1>
          <p className="bookmark-form__description">
            Update your saved link details — change the title, description, URL,
            or tags anytime.
          </p>
        </div>

        <FormikForm
          form="update"
          formik={formik}
          className="bookmark-form"
          submitLabel="Save Bookmark"
          submittingLabel="Saving..."
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
