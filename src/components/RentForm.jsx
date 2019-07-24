import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import VirtualizedSelect from 'react-virtualized-select';
//Yup.object()
//var Yup = require('Yup')
// 
// import '../react-select/dist/react-select.css';
// import '../react-virtualized/styles.css';
// import '../react-virtualized-select/styles.css';

const imaginaryThings = [
  { label: 'Thing 1', value: 1 },
  { label: 'Thing 2', value: 2 },
  { label: 'Thing 3', value: 3 },
  { label: 'Thing 4', value: 4 },
  { label: 'Thing 5', value: 5 },
];

const RentForm = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  const _handleSelect = (selectChoice) => {
    setFieldValue('imaginaryThingId', selectChoice.value);
  };

  return(
    <form className="p-5" onSubmit={handleSubmit}>
      {/* <h1>Hello. Please enter all values as a <mark>monthly</mark> income or expense.</h1> */}
      {/* <div className="form-group"> */}
      {/*   <label>Rent</label> */}
      {/*   <input name="email" type="text"  */}
      {/*     className={`form-control ${errors.email && touched.email && 'is-invalid'}`} */}
      {/*     value={values.email}  */}
      {/*     onChange={handleChange} */}
      {/*     onBlur={handleBlur} /> */}
      {/*   {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>} */}
      {/* </div> */}
      {/* <div className="form-group"> */}
      {/*   <label>Imaginary Username</label> */}
      {/*   <input name="username" type="text"  */}
      {/*     className={`form-control ${errors.username && touched.username && 'is-invalid'}`} */}
      {/*     value={values.username}  */}
      {/*     onChange={handleChange} */}
      {/*     onBlur={handleBlur} /> */}
      {/*   {errors.username && touched.username && <div className="invalid-feedback">{errors.username}</div>} */}
      {/* </div> */}
      {/* <div className="form-group"> */}
      {/*   <label>Imaginary Thing</label> */}
      {/*   <VirtualizedSelect */}
      {/*     name="imaginaryThingId" */}
      {/*     value={values.imaginaryThingId} */}
      {/*     options={imaginaryThings} */}
      {/*     onChange={_handleSelect} /> */}
      {/*   <small className="form-text text-muted"> */}
      {/*     This is optional */}
      {/*   </small> */}
      {/* </div> */}

      <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
        {isSubmitting ? 'WAIT PLIZ' : 'CLICK ME'}
      </button>
    </form>
  );
}

export default Formik({
  mapPropsToValues: (props) => ({ 
    email: props.user.email,
    username: props.user.username,
    imaginaryThingId: props.user.imaginaryThingId,
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit them do the server. do whatever you like!
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
})(RentForm);