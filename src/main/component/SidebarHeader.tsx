import * as React from "react";
import styled from 'styled-components';
import '../../assets/css/sidebar.css'
import logo from "../../assets/img/cloakbox_logo_transparent.png";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    rtl: boolean;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.div`
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-image: url(${logo});
    //background-color: #222;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, ...rest }) => {
    return (
        <StyledSidebarHeader {...rest}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledLogo/>
                <p className={'sidebarTitle'}>CloakBox</p>

            </div>
        </StyledSidebarHeader>
    );
};