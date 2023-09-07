import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
export const PrimaryNav = styled.nav`
  z-index: 10;
  width: 100%;
  height: 80px;
  display: flex;
  background: #363753;
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
  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.9rem;
    top: 0;
    right: 0;
    position: absolute;
    cursor: pointer;
    transform: translate(-100%, 75%);
  }
`;
export const Menu = styled.div`
  display: flex;

  align-items: center;
  margin-right: -14px;
  @media screen and (max-width: 768px) {
    display: none;
  }
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
