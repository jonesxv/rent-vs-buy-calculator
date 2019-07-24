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
            <div >
            <Form >
              <h1>Rent</h1>
              <FieldArray
                name='rentData'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.rentData.map((field, index) => (           
                     <div key={index}>
							       
                      <label htmlFor={`fields.${field}`}>{field}</label>
                      <Field 
                        
                        type="number"
                        name={field} 
                       />
                     </div>
                  ))}

                 </div>
            	  )}
            	/>
          </Form>
          <Form className="input-form col-5">
            <h1>Buy</h1>
            <FieldArray
                name='fields'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.mortgageData.map((field, index) => (           
                     <div key={index}>
                      <label className="col-3 col-form-label text-right" htmlFor={`fields.${field}`}>{field}</label>
                      <Field className="input-field col-6"
                        type="number"
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