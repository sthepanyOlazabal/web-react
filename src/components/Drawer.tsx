import React, { useState } from "react";
import { Drawer } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Logo from "./../assets/images/logo.png";
import AppMenu from "./app-menu";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    usuario: {
      fontSize: "1rem",
      marginLeft: theme.spacing(1),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

const DrawerGD = (props: any) => {
  const classes = useStyles();
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    props.setIsOpen(open);
  };
  const changestate = (estado: boolean) => props.setIsOpen(estado);
  return (
    <>
      <Drawer
        open={props.isOpen}
        onClose={toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          paddingTop={4}
          paddingBottom={4}
        >
          <img src={Logo} />
        </Box>
        <AppMenu data={changestate} />
      </Drawer>
    </>
  );
};

export default DrawerGD;
