import React, { useState } from "react";
import { useResetAtom } from "jotai/utils";
import { loaderAtom, popupAtom } from "../jotai/store";
import { useAtom } from "jotai";
import {
  FormContainer,
  sharedFlexSpaceBetween,
  styledInputStyle,
} from "../styles/global";
import Layout from "../components/Layout";
import { BlueCircle, Container, OrangeCircle, Title } from "./VesselETA";
import Loader from "../components/Loader";
import Popup from "../components/Popup";
import styled, { css } from "styled-components";
import AppColors from "../styles/colors";

const UploadFile = () => {
  const resetPopup = useResetAtom(popupAtom);
  const [popupData, setPopupData] = useAtom(popupAtom);
  const [isLoading, setIsLoading] = useAtom(loaderAtom);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let res = await uploadFile(file);
  };

  const uploadFile = (file: any) => {};

  const handleOnChange = (e: any) => {
    console.log(e.target.files[0]);
  };

  return (
    <>
      <Layout>
        <Container>
          <BlueCircle />
          <OrangeCircle />
          <StyledFormContainer>
            <Title>Upload File</Title>
            <UploadForm onSubmit={handleSubmit}>
              <Input type="file" onChange={handleOnChange} />
              <Button type="submit">Upload File</Button>
            </UploadForm>
          </StyledFormContainer>
          {popupData.isOpen && <Popup />}
        </Container>
      </Layout>
      {isLoading && <Loader />}
    </>
  );
};

export default React.memo(UploadFile);

const StyledFormContainer = styled(FormContainer)`
  height: 10rem;
  width: 50rem;
`;

const Input = styled.input`
  ${styledInputStyle}
  padding: 1rem 0.5rem;
  height: unset;
`;
const UploadForm = styled.form`
  ${sharedFlexSpaceBetween}
`;
const Button = styled.button`
  padding: 1rem;
  width: 10rem;
  background: ${AppColors.ThemeGreen};
  color: ${AppColors.White};
  font-size: 1rem;
  margin-left: 1rem;
  border: none;
  font-weight: 600;
`;
