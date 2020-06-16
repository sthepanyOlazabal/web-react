import React, { useState } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import "./App.css";
import Rutas from "./Rutas";
import Logo from "./assets/images/logo.png";
import AppMenu from "./components/app-menu";
import OPCIONES_MENU from "./data/rutas";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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

function App() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(open);
  };

  const changestate = (estado: boolean) => setIsOpen(estado);

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Panel de Administración
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        open={isOpen}
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
      <Rutas rutas={OPCIONES_MENU}></Rutas>
      <div className="App">
        <p className="App-intro">
          © 2020 Grupo Driver | Todos los derechos reservados.
        </p>
      </div>
      <Redirect from="/" exact to="/home" />
    </Router>
  );
}

export default App;
