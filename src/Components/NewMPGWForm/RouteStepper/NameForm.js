import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withFormik } from "formik";
import * as Yup from 'yup';

const NameForm = props => {
    const {
      classes,
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
    } = props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            id="ruleName"
            label="Rule Name"
            value={values.ruleName}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.ruleName ? errors.ruleName : ""}
            error={touched.ruleName && Boolean(errors.ruleName)}
            margin="dense"
            variant="outlined"
          />
          <Button type="submit" color="primary" disabled={isSubmitting}>
            SUBMIT
          </Button>
          <Button color="secondary" onClick={handleReset}>
            CLEAR
          </Button>
        </form>
      </div>
    );
  };

  const Form = withFormik({
    mapPropsToValues: ({
      ruleName
    }) => {
      return {
        ruleName: ruleName || ""
      };
    },
  
    validationSchema: Yup.object().shape({
      ruleName: Yup.string().required("Required"),
    }),
  
    handleSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    }
  })(NameForm)

  export default (Form);
