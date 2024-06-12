import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const MarginDiscountForm = () => {
  const initialValues = {
    totalMargin: '',
    percentage: '',
    upfrontMargin: '',
    minDiscount: '',
    maxDiscount: '',
    totalDiscountPercentage: ''
  };

  const validationSchema = Yup.object().shape({
    totalMargin: Yup.number().required('Total Margin is required'),
    percentage: Yup.number().required('Percentage is required'),
    upfrontMargin: Yup.number()
      .required('Upfront Margin is required')
      .test('is-valid-upfront-margin', 'Upfront Margin should not be greater than the sum of Total Margin and Percentage', function(value) {
        const { totalMargin, percentage } = this.parent;
        return value <= (parseFloat(totalMargin) + parseFloat(percentage));
      }),
    minDiscount: Yup.number().required('Minimum Discount is required'),
    maxDiscount: Yup.number().required('Maximum Discount is required'),
    totalDiscountPercentage: Yup.number()
      .required('Total Discount Percentage is required')
      .test('is-valid-total-discount-percentage', 'Total Discount Percentage should not be greater than the sum of Upfront Margin and Percentage', function(value) {
        const { upfrontMargin, percentage } = this.parent;
        return value <= (parseFloat(upfrontMargin) + parseFloat(percentage));
      })
  });

  const handleSubmit = (values) => {
    console.log('Form data:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={true}  // Ensure validation on blur
      validateOnChange={true}  // Ensure validation on change
    >
      {({ setFieldValue, values, setFieldTouched }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="totalMargin">Total Margin:</label>
            <Field
              type="number"
              id="totalMargin"
              name="totalMargin"
              onChange={(e) => {
                const totalMarginValue = e.target.value;
                setFieldValue('totalMargin', totalMarginValue);
                setFieldValue('percentage', 1);
                setFieldTouched('totalMargin', true);  // Mark totalMargin as touched
                setFieldTouched('percentage', true);  // Mark percentage as touched
                setFieldValue('totalDiscountPercentage', parseFloat(values.upfrontMargin) + 1);
                setFieldTouched('totalDiscountPercentage', true);  // Mark totalDiscountPercentage as touched
              }}
              required
            />
            <ErrorMessage name="totalMargin" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="percentage">Percentage:</label>
            <Field
              type="number"
              id="percentage"
              name="percentage"
              onChange={(e) => {
                const percentageValue = e.target.value;
                setFieldValue('percentage', percentageValue);
                setFieldTouched('percentage', true);  // Mark percentage as touched
                setFieldValue('totalDiscountPercentage', parseFloat(values.upfrontMargin) + parseFloat(percentageValue));
                setFieldTouched('totalDiscountPercentage', true);  // Mark totalDiscountPercentage as touched
              }}
              required
            />
            <ErrorMessage name="percentage" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="upfrontMargin">Upfront Margin:</label>
            <Field
              type="number"
              id="upfrontMargin"
              name="upfrontMargin"
              onChange={(e) => {
                const upfrontMarginValue = e.target.value;
                setFieldValue('upfrontMargin', upfrontMarginValue);
                setFieldTouched('upfrontMargin', true);  // Mark upfrontMargin as touched
                setFieldValue('totalDiscountPercentage', parseFloat(upfrontMarginValue) + parseFloat(values.percentage));
                setFieldTouched('totalDiscountPercentage', true);  // Mark totalDiscountPercentage as touched
              }}
              required
            />
            <ErrorMessage name="upfrontMargin" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="minDiscount">Minimum Discount:</label>
            <Field
              type="number"
              id="minDiscount"
              name="minDiscount"
              required
            />
            <ErrorMessage name="minDiscount" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="maxDiscount">Maximum Discount:</label>
            <Field
              type="number"
              id="maxDiscount"
              name="maxDiscount"
              required
            />
            <ErrorMessage name="maxDiscount" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="totalDiscountPercentage">Total Discount Percentage:</label>
            <Field
              type="number"
              id="totalDiscountPercentage"
              name="totalDiscountPercentage"
              required
            />
            <ErrorMessage name="totalDiscountPercentage" component="div" className="error" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default MarginDiscountForm;
