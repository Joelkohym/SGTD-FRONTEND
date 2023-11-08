import React, { useRef } from "react";
import { sharedFlexCenter, Image, Section, FormTitle } from "../styles/global";
import {
  API_Methods,
  AlertType,
  AppRoutes,
  Response_Message,
  formFieldTypes,
} from "../lib/constants";
import styled, { css } from "styled-components";
import AppColors from "../styles/colors";
import { Link, LogoContainer } from "./Login";
import { useNavigate } from "react-router-dom";
import { useMakePOSTRequest } from "../hooks/useMakePostRequest";
import { useResetAtom } from "jotai/utils";
import { popupAtom } from "../jotai/store";
import { useAtom } from "jotai";
import Popup from "../components/Popup";
import Button from "../components/Button";
import { Controller, useForm } from "react-hook-form";
import Input from "../components/Input";

function Register() {
  const navigate = useNavigate();
  const [registerUser] = useMakePOSTRequest();
  const resetPopup = useResetAtom(popupAtom);
  const [popupData, setPopupData] = useAtom(popupAtom);
  const alertMessage = useRef({
    type: "",
    message: "",
    action: () => {},
  });
  const { input, password, email, submit, text, url } = formFieldTypes;
  const { control, handleSubmit } = useForm();
  const formFields = {
    fields: [
      {
        name: "email",
        label: "Email",
        defaultValue: "",
        type: input,
        inputType: email,
        style: InputStyle,
      },
      {
        name: "password",
        label: "Password",
        defaultValue: "",
        inputType: password,
        type: password,
        style: InputStyle,
      },
      {
        name: "api_key",
        label: "API Key",
        defaultValue: "",
        type: input,
        inputType: text,
        style: InputStyle,
      },
      {
        name: "participant_id",
        label: "Participant ID",
        defaultValue: "",
        type: input,
        inputType: text,
        style: InputStyle,
      },
      {
        name: "gsheet_cred_path",
        label: "Gsheet cred path",
        defaultValue: "",
        type: input,
        inputType: text,
        style: InputStyle,
      },
      {
        name: "pitstop_url",
        label: "Pitstop URL",
        defaultValue: "",
        type: url,
        inputType: url,
        style: InputStyle,
      },
    ],
    buttons: [
      {
        name: "Register",
        type: submit,
        onSubmitHandler: (data: any) => handleRegister(data),
        style: btnStyle,
      },
    ],
  };

  const handleRegister = async (data: any) => {
    if (
      (data.email == "" ||
        data.password == "" ||
        data.api_key == "" ||
        data.participant_id == "",
      data.gsheet_cred_path == "" || data.pitstop_url == "")
    ) {
      alertMessage.current = {
        type: AlertType.Error,
        message: "Fields cannot be empty",
        action: resetPopup,
      };
      handlePopup();
      return;
    }
    try {
      let requestData = {
        email: data.email,
        password: data.password,
        api_key: data.api_key,
        participant_id: data.participant_id,
        gsheet_cred_path: data.gsheet_cred_path,
        pitstop_url: data.pitstop_url,
      };
      let res: any = await registerUser(API_Methods.Register, requestData);
      if (res) {
        alertMessage.current = {
          type: AlertType.Success,
          message: "Registered SuccessFully, Login now",
          action: () => {
            navigate(AppRoutes.Login);
            resetPopup();
          },
        };
        handlePopup();
      }
    } catch (error) {
      alertMessage.current = {
        type: AlertType.Error,
        message: "Something went wrong. Try again",
        action: resetPopup,
      };
      handlePopup();
    }
  };

  function handlePopup() {
    setPopupData({
      isOpen: true,
      message: alertMessage.current.message,
      type: alertMessage.current.type,
      btnHandler: alertMessage.current.action,
    });
  }

  return (
    <Section>
      <Header>
        <LogoContainer>
          <Image src="https://sgtradex.com/images/sgtradex-logo.svg" />
        </LogoContainer>
      </Header>
      <FormContainer>
        <Title>Registration Form</Title>
        <Form  onSubmit={handleSubmit(handleRegister)}>
          <FieldContainer>
            {formFields?.fields?.map(
              (formField: any, index: React.Key | null | undefined) => (
                <FormFieldContainer key={index}>
                  <Field>
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
                              required={
                                formField.required && formField.required
                              }
                              defaultValue={formField.defaultValue}
                              placeholder={formField.placeholder}
                              readOnly={formField.readOnly}
                              disabled={formField.disabled}
                            />
                          </>
                        )}
                      />
                    )}
                    <Label htmlFor="text" className="label-name">
                      <ContentName className="content-name">
                        {formField.label}
                      </ContentName>
                    </Label>
                  </Field>
                </FormFieldContainer>
              )
            )}
          </FieldContainer>
          {formFields?.buttons?.map(
            (
              { name, type, onSubmitHandler, style }: any,
              index: React.Key | null | undefined
            ) => (
              <FormFieldContainer>
                <Button
                  key={index}
                  title={name}
                  clickHandler= {() => {}}
                  buttonStyle={style}
                />
              </FormFieldContainer>
            )
          )}{" "}
          <SideTitle>
            Already have an account?{" "}
            <SideLink href={AppRoutes.Login}> Login</SideLink>{" "}
          </SideTitle>
        </Form>
      </FormContainer>
      {popupData.isOpen && <Popup />}
    </Section>
  );
}

export default Register;

const Header = styled.div`
  align-self: center;
`;

const Title = styled(FormTitle)`
  font-size: 3.5rem;
  background: linear-gradient(
    to right,
    ${AppColors.ThemeBlue},
    ${AppColors.ThemePurple},
    ${AppColors.ThemeAqua},
    ${AppColors.ThemePurple}
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  margin: 1.5rem 0;
`;

const SideTitle = styled.div`
  align-self: center;
  padding: 1rem;
`;

const FormContainer = styled.div`
  ${sharedFlexCenter}
  flex-direction: column;
  background: ${AppColors.White};
  width: 60%;
`;

const FieldContainer = styled.div`
  ${sharedFlexCenter};
  flex-wrap: wrap;
  gap: 1rem 2rem;
`;
const ContentName = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-bottom: 10px;
  transition: all 0.3s ease;
`;
const Form = styled.form`
  ${sharedFlexCenter}
  width:90%;
  flex-direction: column;
  letter-spacing: 0.5px;
`;

const FormFieldContainer = styled.div`
  ${sharedFlexCenter}
  width:40%;
  flex-direction: column;
  margin-top: 0.25rem;
  height: 4rem;
  overflow: hidden;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  font-weight:400;
  border-bottom: 2px solid ${AppColors.ThemeLightGrey};
  &::after {
    content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid ${AppColors.ThemeSkyBlue};
  transform: translateX(-100%);
  transition: all 0.3s ease;
`;

const btnStyle = css`
  width: 15rem;
  margin: 2rem;
  padding: 1rem;
  font-size: 1.2rem;
  background: linear-gradient(90deg, ${AppColors.ThemeAqua}, transparent)
    ${AppColors.ThemeDarkPurple};
  transition: background-color 1s;
  &:hover {
    background-color: ${AppColors.ThemeAqua};
    background: linear-gradient(
        90deg,
        ${AppColors.ThemeDarkPurple},
        transparent
      )
      ${AppColors.ThemeAqua};
  }
`;

const SideLink = styled(Link)`
  color: ${AppColors.ThemeSkyBlue};
`;

const InputStyle = css`
  margin: 0;
  border: none;
  width: 90%;
  font-size: 1.1rem;
  padding: 0.7rem 0;
  font-weight: 400;
  &:focus,
  &.hasText {
    border: none;
    + ${Label} ${ContentName}, &:valid + ${Label} ${ContentName} {
      transform: translateY(-100%);
      font-size: 14px;
      left: 0;
      color: ${AppColors.ThemeSkyBlue};
    }

    + ${Label}::after, &:valid + ${Label}::after {
      transform: translateX(0%);
    }
  }
`;
