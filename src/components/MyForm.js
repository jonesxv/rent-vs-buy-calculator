import React from 'react';
import { Formik, FormikProps, Form, Field, ErrorMessage, FieldArray } from 'formik';
import DataGraph from './DataGraph';

const fields = {
  rentData: [
    'income available for housing',
    'investment gain',
    'monthly rent',
    'utilities',
  ],
  mortgageData: [
    'income available for housing',
    'investment gain',
    'cost',
    'down payment',
    'property taxes',
    'maintenance',
    'interest'
  ]
}

let initVals = {}

fields.rentData.forEach(el => {
  initVals[el] = ''
}) 

fields.mortgageData.forEach(el => {
  initVals[el] = ''
})


class MyForm extends React.Component {
  
  handleSubmit = (values, { 
    props = this.props, 
    setSubmitting 
  }) => {

    setSubmitting(false);
    return;
  }


  render() {

    console.log(initVals)
     
    return(
      <Formik
        initialValues={{
          ...initVals,
          rentData: fields.rentData,
          mortgageData: fields.mortgageData,
        }}
        validate={(values) => {
          let errors = [];
         
          if(!values.fields.length)
            errors.fields = "At least one field is required";
          return errors;
        }}

        onSubmit={this.handleSubmit}
        render={formProps => {
          return(
            <>
            <div className="row justify-content-around form-container">
            <Form className="col-4 input-form">
              <h1>Rent</h1>
              <FieldArray
                name='rentData'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.rentData.map((field, index) => (           
                     <div key={index}>
							       
                      <label className="col-5 col-form-label text-left" htmlFor={`fields.${field}`}>{field}</label>
                      <Field 
                        onValueChange={val => formProps.setFieldValue('numbers', val.floatValue)}
                        className="input-field col-6"
                        type="Number"
                        name={field} 
                       />
                     </div>
                  ))}

                 </div>
            	  )}
            	/>
          </Form>
          <Form className="col-4 input-form input-form-right">
            <h1>Buy</h1>
            <FieldArray
                name='fields'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.mortgageData.map((field, index) => (           
                     <div key={index}>
                      <label className="col-5 col-form-label text-left" htmlFor={`fields.${field}`}>{field}</label>
                      <Field 
                        className="input-field col-6"
                        name={field} 
                       />     
							              
                     </div>
                  ))}
                  </div>
            	  )}
            	/>
            </Form>
            </div>
            <div>
              <DataGraph className="graph" {...formProps.values}/>
            </div>
            </>
          );
        }}
      />);
  }
}

export default MyForm;
