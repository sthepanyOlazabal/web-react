import React, { useState, useContext } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Paper from "@material-ui/core/Paper";
import LogoWhite from "../assets/images/logo-white.png";
import { TextField } from "@material-ui/core";
import { UseForm } from "./../hooks/use-form";
import { auth } from "../services/firebase";
import { GlobalContext } from "../global/GlobalContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

function Login(props: any) {
  const classes = useStyles();
  let { usuario, setUsuario } = useContext(GlobalContext);
  const [values, handleInputChange] = UseForm({
    correo: "",
    password: "",
  });
  const { correo, password } = values;
  const autenticar = async () => {
    auth
      .signInWithEmailAndPassword(correo, password)
      .then((res) => {
        res.user?.getIdTokenResult().then((tokenRes) => {
          let usuarioObj = {
            correo: tokenRes.claims.email,
            token: tokenRes.token,
            fechaExp: tokenRes.claims.exp,
            estaAutenticado: true,
          };
          setUsuario(usuarioObj);

          props.history.push("/");

          localStorage.setItem("usuario", JSON.stringify(usuarioObj));
        });
      })
      .catch((err) => {
        //si todo sale mal
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8} sm={6}>
          <div className="App-header-not-found"></div>
        </Grid>
        <Grid item xs={4} sm={6}>
          <div>
            <h1>Iniciar sesión</h1>
            {JSON.stringify(values, null, 3)}
            <br></br>
            {JSON.stringify(usuario)}
            <div>
              <TextField
                required
                id="standard-required"
                name="correo"
                label="Correo"
                value={values.correo}
                onChange={handleInputChange}
              />
              <br></br>
              <TextField
                id="standard-password-input"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </div>
            <Button
              variant="contained"
              color="default"
              startIcon={<HomeIcon />}
              onClick={autenticar}
            >
              Ingresar
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
    // <div className="App">
    //   <div className="App-header">
    //     <div>
    //       <img src={LogoWhite} className="App-logo" alt="logo"></img>
    //     </div>
    //   </div>
    // </div>
  );
}

export default withRouter(Login);
