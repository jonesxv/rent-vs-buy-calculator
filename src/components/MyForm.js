import React from 'react';
import { Formik, FormikProps, Form, Field, ErrorMessage, FieldArray } from 'formik';
import NumberFormat from 'react-number-format';
import DataGraph from './DataGraph';
import taxInfo from '../data/taxInfo';
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
    'asset investment gain',
    'home value',
    'down payment',
    'property taxes',
    'maintenance',
    'utilities',
    'interest',
    'closing cost'
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
        prefix={this.props.name !== 'property taxes' && this.props.name !== 'asset investment gain' && this.props.name !== 'investment gain' && this.props.name !== 'closing cost' ? '$' : ''}
        suffix={this.props.name === 'property taxes' || this.props.name === 'asset investment gain' || this.props.name === 'investment gain' || this.props.name === 'closing cost' ? '%' : ''}
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
          location: ''
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
              <div className="justify-content-center row">
                <label className="col-md-4 col-sm-12 col-form-label text-left" htmlFor="location">
                  <h2 className="location-title">What state do you live in?</h2>
                </label>
                <select
                  className="input-field col-md-3 col-sm-12 location"
                  name="location"
                  value={formProps.values.location}
                  onChange={formProps.handleChange}
                  onBlur={formProps.handleBlur}
                  style={{ display: 'block' }}
                >
                  <option value="" label="Select a location" />
                  {Object.keys(taxInfo).map(state => (
                    <option value={state} label={state} />
                  ))}
                </select>
              </div>
            <a className="citation" href="https://wallethub.com/edu/t/states-with-the-highest-and-lowest-property-taxes/11585/" atl="tax info">Home and tax information by Wallet Hub, 2019</a>
            <div className="row justify-content-around form-container">
            <Form className="col-md input-form">
              <h1 className="form-title text-left">Rent</h1>
              <FieldArray
                name='rentData'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.rentData.map((field, index) => (           
                     <div key={index}>
							       
                      <label className="col-8 col-form-label text-left" htmlFor={`fields.${field}`}>{field} </label>
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
          <Form className="col-md input-form input-form-right">
            <h1 className="form-title text-left">Buy</h1>
            <FieldArray
                name='fields'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.mortgageData.map((field, index) => (           
                     <div key={index}>
                      <label className="col-8 col-form-label text-left" htmlFor={`fields.${field}`}>{field} {field === 'home value' && formProps.values.location.length > 0 ? `(${formProps.values.location} average: $${taxInfo[formProps.values.location].medianValue})` : ''}</label>
                      {/* <Field 
                        className="input-field col-6"
                        type="Number"
                        name={field} 
                       />      */}
                      <NumberInput 
                        className="input-field col-3"
                        placeholder='0'
                        name={field}
                        value={formProps.values.location.length > 0 && field === 'property taxes' ? taxInfo[formProps.values.location]['effective_real_estate_tax_rate'] * 100 : formProps.values[field]}
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
