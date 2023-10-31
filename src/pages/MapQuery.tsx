import React from "react";
import Layout from "../components/Layout";
import FormController from "../components/FormController";
import { styledInputStyle, submitButtonStyle } from "../styles/global";
import { AppRoutes, formFieldTypes } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import { BlueCircle, Container, OrangeCircle, StyledFormContainer, Title } from "./VesselETA";

const MapQuery: React.FC = () => {
  const navigate = useNavigate();
  const { input, submit, text } = formFieldTypes;

  const formFields = {
    fields: [
      {
        name: "vessel_imo",
        label: "Vessel IMO(s)",
        placeholder: "i.e. 9000000, 9000001, 9000002",
        defaultValue: "",
        type: input,
        inputType: text,
        style: styledInputStyle
      },
    ],
    buttons: [
      {
        name: "Request",
        type: submit,
        onSubmitHandler: (data: any) => handleVesselQueryRequest(data),
        style: submitButtonStyle,
      },
    ],
  };

  function handleVesselQueryRequest(data: any) {
    navigate(AppRoutes.VesselMap)
  }
  return (
    <Layout>
      <Container>
      <BlueCircle />
      <OrangeCircle />
      <StyledFormContainer>
        <Title> Map Query 🗺️</Title>
        <FormController formFields={formFields} />
      </StyledFormContainer>
      </Container>
    </Layout>
  );
};

export default MapQuery;