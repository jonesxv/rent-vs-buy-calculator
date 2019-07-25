import React from 'react';
import { Formik, FormikProps, Form, Field, ErrorMessage, FieldArray } from 'formik';
import NumberFormat from 'react-number-format';
import DataGraph from './DataGraph';
import { Persist } from 'formik-persist'

const fields = {
  rentData: [
    'income available for housing',
    'investment gain',
    'monthly rent',
    'utilities',
  ],
  mortgageData: [
    'income available for housing',
    'asset investement gain',
    'cost',
    'down payment',
    'property taxes',
    'maintenance',
    'utilities',
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



class NumberInput extends React.Component {
  state = {
    value: '',
  };
  render() {
    return (
      <NumberFormat
        prefix={this.props.name !== 'property taxes' ? '$' : ''}
        suffix={this.props.name === 'property taxes' ? '%' : ''}
        placeholder="Number Format Input looses focus"
        isNumericString={true}
        thousandSeparator={true}
        value={this.state.value}
        onValueChange={vals => this.setState({ value: vals.formattedValue })}
        {...this.props}
      />
    );
  }
}

class MyForm extends React.Component {
  
  handleSubmit = (values, { 
    props = this.props, 
    setSubmitting 
  }) => {

    setSubmitting(false);
    return;
  }


  render() {

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
            <Form className="col-6 input-form">
              <h1 className="form-title text-left">Rent</h1>
              <FieldArray
                name='rentData'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.rentData.map((field, index) => (           
                     <div key={index}>
							       
                      <label className="col-8 col-form-label text-left" htmlFor={`fields.${field}`}>{field}</label>
                      {/* <Field 
                        className="input-field col-6"
                        type="Number"
                        name={field} 
                       /> */}
                      <NumberInput 
                        className="input-field col-3"
                        placeholder='0'
                        name={field}
                        value={formProps.values[field]}
                        onValueChange={val => formProps.setFieldValue(field, val.floatValue)}
                      />
                    </div>
                  ))}

                 </div>
            	  )}
            	/>
          </Form>
          <Form className="col-6 input-form input-form-right">
            <h1 className="form-title text-left">Buy</h1>
            <FieldArray
                name='fields'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.mortgageData.map((field, index) => (           
                     <div key={index}>
                      <label className="col-8 col-form-label text-left" htmlFor={`fields.${field}`}>{field}</label>
                      {/* <Field 
                        className="input-field col-6"
                        type="Number"
                        name={field} 
                       />      */}
                      <NumberInput 
                        className="input-field col-3"
                        placeholder='0'
                        name={field}
                        value={formProps.values[field]}
                        onValueChange={val => formProps.setFieldValue(field, val.floatValue)}
                      />
                     </div>
                  ))}
                  </div>
            	  )}
            	/>
              <Persist name="localStoredVals" />
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
