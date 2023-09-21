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
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import GradingIcon from '@mui/icons-material/Grading';
import ArticleIcon from '@mui/icons-material/Article';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton to={"/admin"}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Notification & Alerts" />
    </ListItemButton>

    <ListItemButton to={"/admin"}>
      <ListItemIcon>
        <BookOnlineIcon />
      </ListItemIcon>
      <ListItemText primary="Auction Management" />
    </ListItemButton>

    <ListItemButton to={"/admin"}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Payment Management" />
    </ListItemButton>

    <ListItemButton to={"/admin"}>
      <ListItemIcon>
        <GradingIcon />
      </ListItemIcon>
      <ListItemText primary="Customer support & Help" />
    </ListItemButton>

    <ListItemButton to={"/admin"}>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="Report Analysis" />
    </ListItemButton>

  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
