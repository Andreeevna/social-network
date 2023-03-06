import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "../../redux/users-reducer";
import { useSelector } from "react-redux";
import { getFilter } from "../../redux/users-selectors";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type FormType = {
  term: string;
  friend: string;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getFilter);
  console.log(filter)

  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend:
        values.friend === "null"
          ? null
          : values.friend === "true"
          ? true
          : false,
    };
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  // debugger

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">ALL</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
