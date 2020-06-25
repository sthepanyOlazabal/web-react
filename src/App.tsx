import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";

import "./App.css";
import Rutas from "./Rutas";

import { GlobalContext } from "./global/GlobalContext";
import { IGlobalContext } from "./interfaces/IGlobalContext";
import Login from "./pages/login";
import ToolbarGD from "./components/Toolbar";
import DrawerGD from "./components/Drawer";
import MenuBar from "./components/MenuBar";
import { auth } from "./services/firebase";

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

function App(props: any) {
  const classes = useStyles();
  const [usuario, setUsuario] = useState({} as any);

  let usuarioData: IGlobalContext = {
    usuario,
    setUsuario,
  };

  useEffect(() => {
    auth.onAuthStateChanged((res) => {
      //si retorna null no hay una sesion activa
      //!res es igual a true eso significa que es nulo si lo igualo a false estoy diciendo que no es nulo
      if (!res == false) {
        let usuarioObj = {
          correo: res?.email,
          estaAutenticado: true,
        };
        setUsuario(usuarioObj);
      } else {
        let usuarioObj = {
          correo: "",
          estaAutenticado: false,
        };
        setUsuario(usuarioObj);
      }
    });
  }, []);

  return (
    <GlobalContext.Provider value={usuarioData}>
      {Object.keys(usuario).length === 0 ? (
        <div>CARGANDO...</div>
      ) : (
        <Router>
          <MenuBar></MenuBar>
          <Switch>
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
                usuario.estaAutenticado == false ? (
                  <Login />
                ) : (
                  <Rutas {...props} />
                )
              }
            />
          </Switch>
          <div
            className={
              usuario.estaAutenticado ? "App" : "App grupo-driver-footer-login"
            }
          >
            <p>© 2020 Grupo Driver | Todos los derechos reservados.</p>
          </div>
        </Router>
      )}
    </GlobalContext.Provider>
  );
}

export default App;
