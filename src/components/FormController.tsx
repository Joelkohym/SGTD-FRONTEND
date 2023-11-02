import React from "react";
import { Controller, useForm } from "react-hook-form";
import { formFieldTypes } from "../lib/constants";
import Button from "./Button";
import Input from "./Input";
import styled from "styled-components";
import { sharedFlexCenter } from "../styles/global";

interface FormProps {
  formFields: any;
}

const FormController: React.FC<FormProps> = ({ formFields }) => {
  const { control, handleSubmit } = useForm(); //TODO: controller is used to register external component(i.e Input, dropdown) values to form.
  const { submit } = formFieldTypes;

  return (
    <Form>
      {formFields?.fields?.map(
        (formField: any, index: React.Key | null | undefined) => (
          <FormFieldContainer key={index}>
            <Field>
              <Label>{formField.label}</Label>
              {formField.defaultValue !== "undefined" && ( //Temporary approach. will be checked once api's available
                <Controller
                  name={formField.name}
                  control={control}
                  defaultValue={formField.defaultValue}
                  render={({ field }) => (
                    <>
                      <Input
                        title={formField.name}
                        value={field.value ?? formField.defaultValue}
                        onChangeHandler={field.onChange}
                        type={formField.inputType}
                        inputStyle={formField.style}
                        required={formField.required && formField.required}
                        defaultValue={formField.defaultValue}
                        placeholder={formField.placeholder}
                        readOnly={formField.readOnly}
                        disabled={formField.disabled}
                        enableInputStyleWithValue={
                          formField?.enableInputStyleWithValue
                        }
                      />
                    </>
                  )}
                />
              )}
            </Field>
          </FormFieldContainer>
        )
      )}
      {formFields?.buttons?.map(
        (
          { name, type, onSubmitHandler, style }: any,
          index: React.Key | null | undefined
        ) => (
          <FormFieldContainer>
            <Button
              key={index}
              title={name}
              clickHandler={
                type === submit
                  ? handleSubmit(onSubmitHandler)
                  : onSubmitHandler
              }
              buttonStyle={style}
            />
          </FormFieldContainer>
        )
      )}{" "}
    </Form>
  );
};

export default FormController;

const Form = styled.form`
  ${sharedFlexCenter}
  width:90%;
  flex-direction: column;
`;

const FormFieldContainer = styled.div`
  ${sharedFlexCenter}
  width:80%;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-right: 1rem;
  text-transform: capitalize;
  width: max-content;
`;
