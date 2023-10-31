import React, { useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaSignOutAlt,
  FaMapMarkedAlt
} from "react-icons/fa";
import { TbBrandGoogleBigQuery } from "react-icons/tb";
import styled from "styled-components";
import AppColors from "../styles/colors";
import { Image, sharedFlexCenter } from "../styles/global";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../lib/constants";

interface LayoutProps {
  children?: any;
}

const NavButtonData = [
  {
    label: "Position Map",
    link: AppRoutes.MapQuery,
    icon: <FaMapMarkedAlt size ={25}/>,
    isPublic: true,
  },
  {
    label: "Vessel ETA",
    link: AppRoutes.VesselETA,
    icon: <TbBrandGoogleBigQuery size={25} />,
    isPublic: true,
  },
  {
    label: "Logout",
    link: ``,
    icon: <FaSignOutAlt size={25} />,
    isPublic: true,
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <DrawerContainer>
      <SideMenu $showMenu={showMenu}>
        <LogoContainer>
          <Image src="https://sgtradex.com/images/sgtradex-logo.svg" />
        </LogoContainer>
        <NavItem>
          {NavButtonData.map(
            (btnData, index) =>
              btnData.isPublic && (
                <NavLink
                  $isActive={location.pathname == btnData.link}
                  $showMenu={showMenu}
                  onClick={() => navigate(btnData.link)}
                  key={index}
                >
                  <NavIcon>{btnData.icon}</NavIcon>
                  {showMenu && <NavTitle>{btnData.label}</NavTitle>}
                </NavLink>
              )
          )}
        </NavItem>
      </SideMenu>
      <Page>
        <DrawerIconContainer
          $showMenu={showMenu}
          $isActive={false}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          {showMenu ? <FaAngleLeft size={24} /> : <FaAngleRight size={24} />}
        </DrawerIconContainer>
        <PageContent>{children}</PageContent>
      </Page>
    </DrawerContainer>
  );
};

export default Layout;

const DrawerContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow:hidden;
`;
const NavLink = styled.a<{ $showMenu: boolean; $isActive: boolean }>`
  display: flex;
  align-items: center;
  color: ${AppColors.White};
  font-weight: 600;
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.8rem 0;
  background: ${(props) => (props.$isActive ? AppColors.ThemeSkyBlue : "")};
  text-decoration: none;
  border-bottom: 1px solid ${AppColors.ThemeTransparencyWhite};
  &:hover {
    background: ${AppColors.ThemeSkyBlue};
  }
`;

const DrawerIconContainer = styled(NavLink)`
  cursor: pointer;
  width: max-content;
  background: ${AppColors.ThemeLightBlack};
  border-radius: 0.2rem;
  padding: 0.5rem;
  margin: 1rem;
  position: absolute;
  z-index: 10;
  &:hover {
    background: ${AppColors.ThemeLightBlack};
  }
`;

const LogoContainer = styled.div`
  ${sharedFlexCenter}
  height: 12%;
  padding-top: 5.5rem;
`;

const SideMenu = styled.div<{ $showMenu: boolean }>`
  height: 100vh;
  ${sharedFlexCenter}
  flex-direction: column;
  background-color: ${AppColors.ThemeLightBlack};
  transition: 0.5s;
  width: ${(props) => (props.$showMenu ? `20rem` : `0%`)};
`;

const NavItem = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: ${AppColors.White}
`;

const NavIcon = styled.div`
  padding-left: 1rem;
`;

const NavTitle = styled.div`
  margin-left: 1.25rem;
`;

const Page = styled.div`
  width: 100%;
`;

const PageContent = styled.div`
  height: 100%;
  flex-direction: column;
  ${sharedFlexCenter}
  width: 100%;
`;
