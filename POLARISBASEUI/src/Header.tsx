import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MenuTabs from "./MenuTabs";
import "./Header.css"
const Header: React.FC = () => {
  return (
    <div className="dashboard">
      <AppBar position="static" style={{ backgroundColor: "black", width:"100%" }}>
        <Toolbar style={{ minHeight: "20px" }}>
          <Typography variant="h6" className="logo" style={{
            color:'#89E689'
          }}>
            EVERNORTH
          </Typography>
          <Box flexGrow={1} />
          <Typography variant="body1" className="user-info" style={{color:"#89E689"}}>
            <IconButton style={{ color: "#89E689" }}>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            Messages
          </Typography>
          <Typography variant="body1" className="user-info"  style={{color:"#89E689"}}>
            <IconButton style={{ color: "#89E689" }}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
            Deepika S
          </Typography>
        </Toolbar>
      </AppBar>
      <MenuTabs/>
    </div>
  );
};

export default Header;
