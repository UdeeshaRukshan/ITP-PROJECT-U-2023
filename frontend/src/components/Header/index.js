import React from "react";
import { useState } from "react";
import {
  PrimaryNav,
  MenuLink,
  Menu,
  Hamburger,
  RightAlignedMenuLink,
  LeftAlignedMenuLogo,
} from "./NavElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "./Dropdown";
import Notification from "../notification/Notification";

import Wishlist from "../../pages/wishlist";

const Navbar = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [width, setWidth] = useState(props.width ? props.width : "100%");
  return (
    <>
      <PrimaryNav style={{ width }}>
        <Hamburger />
        <LeftAlignedMenuLogo>
          <MenuLink to="/home" activeStyle>
            AuctionPal
          </MenuLink>
        </LeftAlignedMenuLogo>
        <Menu>
          <MenuLink to="/home" activeStyle>
            Home
          </MenuLink>
          <MenuLink
            to="/about"
            activeStyle
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            Category
            {dropdown && <Dropdown />}
          </MenuLink>
          <MenuLink to="/products" activeStyle>
            Contact us
          </MenuLink>
          <RightAlignedMenuLink to="/blog" activeStyle>
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "#ffffff", width: "30px", height: "30px" }}
            />
          </RightAlignedMenuLink>
          <MenuLink to="/dashbord" activeStyle>
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#ffffff", width: "30px", height: "30px" }}
            />
          </MenuLink>
        </Menu>
      </PrimaryNav>
    </>
  );
};
export default Navbar;
