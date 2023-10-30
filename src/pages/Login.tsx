import styled, { css } from "styled-components";
import {
  Image,
  sharedFlexSpaceBetween,
  Section,
  sharedFlexCenter,
} from "../styles/global";
import AppColors from "../styles/colors";
import {
  API_Methods,
  AlertType,
  AppRoutes,
  formFieldTypes,
} from "../lib/constants";
import { useNavigate } from "react-router-dom";
import { useMakePOSTRequest } from "../hooks/useMakePostRequest";
import Popup from "../components/Popup";
import { useResetAtom } from "jotai/utils";
import { popupAtom } from "../jotai/store";
import { useAtom } from "jotai";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
  const navigate = useNavigate();
  const [getLogin] = useMakePOSTRequest();
  const { input, password, email, submit } = formFieldTypes;
  const resetPopup = useResetAtom(popupAtom);
  const [popupData, setPopupData] = useAtom(popupAtom);
  const alertMessage = useRef("");

  const { control, handleSubmit } = useForm(); //TODO: controller is used to register external component(i.e Input, dropdown) values to form.
  const formFields = {
    fields: [
      {
        name: "email",
        label: "Email",
        placeholder: "Email",
        defaultValue: "",
        type: input,
        inputType: email,
        style: styledInputStyle,
      },
      {
        name: "password",
        label: "Password",
        placeholder: "Password",
        defaultValue: "",
        inputType: password,
        type: password,
        style: styledInputStyle,
      },
    ],
    buttons: [
      {
        name: "Log In",
        type: submit,
        onSubmitHandler: (data: any) => handleLogin(data),
        style: loginButtonStyle,
      },
      {
        name: "Register",
        onSubmitHandler: () => navigate(AppRoutes.Register),
        style: registerButtonStyle,
      },
    ],
  };

  const handleLogin = async (data: any) => {
    if (data.email == "") {
      alertMessage.current = "Email cannot be empty";
      handlePopupData();
      return;
    } else if (data.password == "") {
      alertMessage.current = "Password cannot be empty";
      handlePopupData();
      return;
    }
    try {
      let res: any = await getLogin(API_Methods.Login, {
        email: data.email,
        password: data.password,
      });
      if (res) {
        localStorage.setItem("access_token", res.access_token);
        navigate(AppRoutes.TableView);
      }
    } catch (error) {
      alertMessage.current = "Login Failed! Try Again";
      handlePopupData();
    }
  };

  function handlePopupData() {
    setPopupData({
      isOpen: true,
      message: alertMessage.current,
      type: AlertType.Error,
      btnHandler: resetPopup,
    });
  }

  return (
    <Section>
      <LogoContainer>
        <Image src="https://sgtradex.com/images/sgtradex-logo.svg" />
      </LogoContainer>
      <FormContainer>
        <FormTitle>Login Here</FormTitle>
        {/* <FormController formFields={formFields} /> */}
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
      </FormContainer>
      {popupData.isOpen && <Popup />}
    </Section>
  );
}

export default Login;

export const LogoContainer = styled.div`
  width: 10rem;
`;

const FormContainer = styled.div`
  background: ${AppColors.ThemeTransparencyWhite};
  width: 25rem;
  border-radius: 0.5rem;
  ${sharedFlexSpaceBetween}
  flex-direction: column;
  color: #ffffff;
  letter-spacing: 0.5px;
  padding: 2rem 0;
  border: 2px solid ${AppColors.ThemeTransparencyWhiteLight}
`;

export const FormTitle = styled.h1`
  padding: 1rem 2rem 1.5rem;
  font-size: 2.1rem;
  color: ${AppColors.White};
`;

export const Link = styled.a`
  color: ${AppColors.ThemeBlue};
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
`;

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

const styledInputStyle = css`
  background: ${AppColors.ThemeTransparencyWhiteLight};
  height: 2.5rem;
  border-radius: 0.2rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 300;
  border: none;
  padding: 0.2rem 0.5rem;
  color: ${AppColors.White};
  &::placeholder {
    color: ${AppColors.White};
    font-weight: 100;
  }
`;

const loginButtonStyle = css`
  padding: 1rem;
  width: 100%;
  background: ${AppColors.ThemeGreen};
  color: ${AppColors.White};
  font-size: 1.25rem;
  margin-top: 1rem;
`;
const registerButtonStyle = css`
  ${loginButtonStyle}
  background: ${AppColors.ThemeBlack};
  margin-top: 0rem;
`;
