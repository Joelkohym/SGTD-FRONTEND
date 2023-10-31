import React, { useRef } from "react";
import Layout from "../components/Layout";
import {
  API_Methods,
  AlertType,
  AppRoutes,
  formFieldTypes,
} from "../lib/constants";
import styled from "styled-components";
import AppColors from "../styles/colors";
import FormController from "../components/FormController";
import {
  FormContainer,
  FormTitle,
  Section,
  sharedCircleStyle,
  sharedFlexCenter,
  styledInputStyle,
  submitButtonStyle,
} from "../styles/global";
import { useMakePOSTRequest } from "../hooks/useMakePostRequest";
import { useNavigate } from "react-router-dom";
import { useResetAtom } from "jotai/utils";
import { loaderAtom, popupAtom } from "../jotai/store";
import { useAtom } from "jotai";
import Popup from "../components/Popup";
import Loader from "../components/Loader";

const VesselETA: React.FC = () => {
  const { input, submit, text } = formFieldTypes;
  const [getVesselTableData] = useMakePOSTRequest();
  const navigate = useNavigate();
  const resetPopup = useResetAtom(popupAtom);
  const [popupData, setPopupData] = useAtom(popupAtom);
  const alertMessage = useRef("");
  const [isLoading, setIsLoading] = useAtom(loaderAtom);

  const formFields = {
    fields: [
      {
        name: "vessel_imo",
        label: "Vessel IMO(s)",
        placeholder: "i.e. 9000000, 9000001, 9000002",
        defaultValue: "",
        type: input,
        inputType: text,
        style: styledInputStyle,
      },
    ],
    buttons: [
      {
        name: "Search",
        type: submit,
        onSubmitHandler: (data: any) => handleVesselQuery(data),
        style: submitButtonStyle,
      },
    ],
  };

  const handleVesselQuery = async (data: any) => {
    setIsLoading(true);
    try {
      let res = await getVesselTableData(API_Methods.Table_view, {
        imo: data.vessel_imo,
      });
      setIsLoading(false);
      if (res)
        navigate(AppRoutes.TableView, { state: { imo: data.vessel_imo } });
    } catch (error) {
      setIsLoading(false);
      alertMessage.current = "IMO(s) could not found";
      handlePopData();
    }
  };

  function handlePopData() {
    setPopupData({
      isOpen: true,
      message: alertMessage.current,
      type: AlertType.Error,
      btnHandler: resetPopup,
    });
  }

  return (
    <>
      <Layout>
        <Container>
          <BlueCircle />
          <OrangeCircle />
          <StyledFormContainer>
            <Title>Vessel ETA Query 🕗</Title>
            <FormController formFields={formFields} />
          </StyledFormContainer>
          {popupData.isOpen && <Popup />}
        </Container>
      </Layout>
      {isLoading && <Loader />}
    </>
  );
};

export default VesselETA;

export const Container = styled(Section)`
  width: 100%;
  height: 100%;
  ${sharedFlexCenter}
  position: relative;
`;

export const StyledFormContainer = styled(FormContainer)`
  height: 30rem;
  justify-content: flex-start;
`;

export const Title = styled(FormTitle)`
  font-size: 1.5rem;
  text-align: center;
`;

export const BlueCircle = styled.div`
  background: linear-gradient(
    to right,
    ${AppColors.ThemeBlue},
    ${AppColors.ThemeLightBlue}
  );
  ${sharedCircleStyle}
  left: 20%;
  top: 5%;
`;

export const OrangeCircle = styled.div`
  background: linear-gradient(
    to right,
    ${AppColors.ThemeDarkOrange},
    ${AppColors.ThemeDarkYellow}
  );
  ${sharedCircleStyle}
  right: 20%;
  bottom: 10%;
`;
