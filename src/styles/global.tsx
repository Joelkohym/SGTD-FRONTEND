import styled, { css } from "styled-components";
import AppColors from "./colors";

const sharedFlexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`

const sharedFlexSpaceBetween = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const sharedButtonStyle = css`
    width: 12rem;
    background: ${AppColors.ThemeLightPurple};
    padding: 1rem;
    &:hover{
        background: ${AppColors.ThemePurple};
    }
`
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

const submitButtonStyle = css`
  padding: 1rem;
  width: 100%;
  background: ${AppColors.ThemeGreen};
  color: ${AppColors.White};
  font-size: 1.25rem;
  margin-top: 1rem;
`;

const Image = styled.img`
    width:100%;
    height:100%;
`
export const Section = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    ${AppColors.ThemeBlue},
    ${AppColors.ThemePurple}
  );
  ${sharedFlexCenter}
  flex-direction: column;
  justify-content: flex-start;
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
  border: 2px solid ${AppColors.ThemeTransparencyWhiteLight};
  z-index: 5;
  backdrop-filter: blur(10px);
`;

export const FormTitle = styled.h1`
  padding: 1rem 2rem 1.5rem;
  font-size: 2.1rem;
  color: ${AppColors.White};
`;

export const sharedCircleStyle = css`
  width:12rem;
  height:12rem;
  border-radius: 50%;
  position: absolute;
`

export{
    sharedFlexCenter,
    sharedFlexSpaceBetween,
    sharedButtonStyle,
    Image,
    styledInputStyle,
    submitButtonStyle,
    FormContainer
}