import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
export const PrimaryNav = styled.nav`
  margin: 0;
  padding: 0;
  z-index: 10;
  width: 180vh;
  height: 80px;
  display: flex;
  justify-content: center;
  background: #363753;
  top: 0;
  position: sticky;
`;
export const MenuLink = styled(Link)`
  color: #fff;
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 650;
  padding: 0 1.2rem;
  height: 100%;
  &.active {
    color: #000000;
  }
`;
export const Hamburger = styled(FaBars)`
  display: none;
  color: #ffffff;
`;
export const Menu = styled.div`
  display: flex;

  align-items: center;
  margin-right: -14px;

  gap: 20px; /* Adjust the gap between menu items */
`;
export const RightAlignedMenuLink = styled(MenuLink)`
  display: flex;
  margin-left: 20vh;
`;

export const LeftAlignedMenuLogo = styled(MenuLink)`
  display: flex;
  margin-right: 50vh;
`;
