import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch as SwitchReact,
  useHistory,
} from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Switch,
} from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import "./App.css";
import Rutas from "./Rutas";
import Logo from "./assets/images/logo.png";
import AppMenu from "./components/app-menu";
import OPCIONES_MENU from "./data/rutas";

import { GlobalContext } from "./global/GlobalContext";
import { IGlobalContext } from "./interfaces/IGlobalContext";
import Login from "./pages/login";
import { render } from "@testing-library/react";

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

function App(props: any) {
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
  const [usuario, setUsuario] = useState({} as any);

  let usuarioData: IGlobalContext = {
    usuario,
    setUsuario,
  };

  useEffect(() => {
    if (localStorage.getItem("usuario") !== null) {
      setUsuario(JSON.parse(localStorage.getItem("usuario") || "{}"));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.reload();
  };

  return (
    <GlobalContext.Provider value={usuarioData}>
      <Router>
        {usuario.estaAutenticado && (
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

                {usuario.estaAutenticado && (
                  <input
                    type="button"
                    onClick={cerrarSesion}
                    value="Cerrar Sesión"
                  />
                )}
              </Toolbar>
            </AppBar>
          </div>
        )}
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

        <SwitchReact>
          <Route
            exact
            path="/login"
            component={(props: any) =>
              usuario.estaAutenticado ? (
                <Redirect to="/" />
              ) : (
                <Login {...props} />
              )
            }
          />

          <Route
            path="/"
            component={(props: any) =>
              !usuario.estaAutenticado ? <Login /> : <Rutas {...props} />
            }
          />
        </SwitchReact>

        <div className="App">
          <p className="App-intro">
            © 2020 Grupo Driver | Todos los derechos reservados.
          </p>
        </div>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
