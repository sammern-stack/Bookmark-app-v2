import { useBookmarksStore } from "@/stores";
import { useCreateForm } from "@/hooks";
import { FormikForm, FormikField, Icon } from "@/components/shared";
import "./styles.scss";

export const CreateBookmarkForm = () => {
  const formik = useCreateForm();
  const formState = useBookmarksStore((s) => s.formState);
  const closeForm = useBookmarksStore((s) => s.closeForm);

  if (formState === "close") return null;

  return (
    <>
      <div className="create-form">
        <button className="create-form__close" onClick={() => closeForm()}>
          <Icon name="icon-close" />
        </button>

        <div className="create-form__header">
          <h1 className="create-form__title">Add a bookmark</h1>
          <p className="create-form__description">
            Save a link with details to keep your collection organized. We
            extract the favicon automatically from the URL.
          </p>
        </div>

        <FormikForm
          form="create"
          formik={formik}
          className="create-form"
          submitLabel="Add Bookmark"
          submittingLabel="Adding..."
        >
          <div className="create-form__fields">
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
              placeholder="e.g. Design, Learning, Tools"
            />
          </div>
        </FormikForm>
      </div>

      <div className="home__backdrop"></div>
    </>
  );
};
