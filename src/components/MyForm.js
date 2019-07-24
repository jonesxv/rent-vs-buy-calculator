import React from 'react';
import { Formik, FormikProps, Form, Field, ErrorMessage, FieldArray } from 'formik';
import DataGraph from './DataGraph';

class MyForm extends React.Component {
  
  handleSubmit = (values, { 
    props = this.props, 
    setSubmitting 
  }) => {

    setSubmitting(false);
    return;
  }
   
  render() {

    let fields = {
      rentData: [
        'total',
        'utilities'
      ],
      mortgageData: [
        'cost',
        'down payment',
        'taxes'
      ]
    }
     
    return(
      <Formik
        initialValues={{
          rentData: fields.rentData,
          mortgageData: fields.mortgageData,
          total: '',
          utilities: '',
          cost: '',
          'down payment': '',
          taxes: ''
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
            <div className="form-container">
            <Form className="input-form">
              <FieldArray
                name='rentData'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.rentData.map((field, index) => (           
                     <div key={index}>
							       
                      <label htmlFor={`fields.${field}`}>{field}</label>
                      <Field 
                        name={field} 
                       />
                     </div>
                  ))}

                 </div>
            	  )}
            	/>
          </Form>
          <Form className="input-form">
            <FieldArray
                name='fields'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.mortgageData.map((field, index) => (           
                     <div key={index}>
                      <label htmlFor={`fields.${field}`}>{field}</label>
                      <Field 
                        name={field} 
                       />     
							              
                     </div>
                  ))}
                  </div>
            	  )}
            	/>
            </Form>
            </div>
              <DataGraph {...formProps.values}/>
            </>
          );
        }}
      />);
  }
}

export default MyForm;