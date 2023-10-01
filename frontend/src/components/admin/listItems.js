import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import GradingIcon from "@mui/icons-material/Grading";
import ArticleIcon from "@mui/icons-material/Article";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton to={"/admin"}>
      <ListItemText primary="Notification & Alerts" />
    </ListItemButton>

    <ListItemButton to={"/auction"}>
      <ListItemText primary="Auction Management" />
    </ListItemButton>

    <ListItemButton to={"/payment"}>
      <ListItemText primary="Payment Management" />
    </ListItemButton>

    <ListItemButton to={"/customer"}>
      <ListItemText primary="Customer support & Help" />
    </ListItemButton>

    <ListItemButton to={"/agent"}>
      <ListItemText primary="Agent Management" />
    </ListItemButton>

    <ListItemButton to={"/report"}>
      <ListItemText primary="Report Analysis" />
    </ListItemButton>
  </React.Fragment>
);
