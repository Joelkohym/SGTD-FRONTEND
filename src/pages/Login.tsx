import styled, { css } from "styled-components";
import {
  Image,
  Section,
  submitButtonStyle,
  styledInputStyle,
  FormContainer,
  FormTitle,
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
import { AuthDataAtom, popupAtom } from "../jotai/store";
import { useAtom, useSetAtom } from "jotai";
import { useRef } from "react";
import FormController from "../components/FormController";

function Login() {
  const navigate = useNavigate();
  const [getLogin] = useMakePOSTRequest();
  const { input, password, email, submit } = formFieldTypes;
  const resetPopup = useResetAtom(popupAtom);
  const [popupData, setPopupData] = useAtom(popupAtom);
  const alertMessage = useRef("");
  const setToken = useSetAtom(AuthDataAtom)

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
        style: submitButtonStyle,
      },
      {
        name: "Register",
        onSubmitHandler: () => navigate(AppRoutes.Register),
        style: registerButtonStyle,
      },
    ],
  };

  const handleLogin = async (data: any) => {
    try {
      let res: any = await getLogin(API_Methods.Login, {
        email: data.email,
        password: data.password,
      });
      if (res) {
        setToken(res.access_token);
        navigate(AppRoutes.VesselETA);
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
        <FormController formFields={formFields} submitHandler={handleLogin}/>
      </FormContainer>
      {popupData.isOpen && <Popup />}
    </Section>
  );
}

export default Login;

export const LogoContainer = styled.div`
  width: 10rem;
`;

export const Link = styled.a`
  color: ${AppColors.ThemeBlue};
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
`;

const registerButtonStyle = css`
  ${submitButtonStyle}
  background: ${AppColors.ThemeBlack};
  margin-top: 0rem;
`;
