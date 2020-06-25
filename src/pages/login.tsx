import React, { useState, useContext } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import { TextField, InputAdornment } from "@material-ui/core";

import { UseForm } from "./../hooks/use-form";
import { auth } from "../services/firebase";
import { GlobalContext } from "../global/GlobalContext";
import Logo from "../assets/images/logo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bienvenido: {
      paddingLeft: theme.spacing(4),
      marginBottom: "0px",
      fontSize: "5rem",
    },
    grupoDrive: {
      paddingLeft: theme.spacing(4),
      marginTop: "0px",
      fontSize: "5rem",
    },
    imagen: {
      margin: "20px 0px",
    },
    input: {
      width: "100%",
      margin: "10px 0px",
    },
    boton: {
      width: "100%",
      margin: "10px 0px",
      backgroundColor: "#00dea6",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#00a67c",
      },
    },
    paper: {
      padding: theme.spacing(5),
      textAlign: "center",
      backgroundColor: "transparent",
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(5),
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
  const [errorEmail, setErrorEmail] = useState({
    estado: false,
    mensaje: "",
  });
  const [errorPassword, setErrorPassword] = useState({
    estado: false,
    mensaje: "",
  });

  const autenticar = async () => {
    auth
      .signInWithEmailAndPassword(correo, password)
      .then((res) => {
        res.user?.getIdTokenResult().then((tokenRes) => {
          let usuarioObj = {
            correo: tokenRes.claims.email,
            estaAutenticado: true,
          };
          setUsuario(usuarioObj);

          props.history.push("/");
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorEmail({
          estado: false,
          mensaje: "",
        });
        setErrorPassword({
          estado: false,
          mensaje: "",
        });
        if (err.code === "auth/invalid-email") {
          setErrorEmail({
            estado: true,
            mensaje: "El correo ingresado tiene un formato inválido.",
          });
        }
        if (err.code === "auth/user-not-found") {
          setErrorEmail({
            estado: true,
            mensaje:
              "El usuario no existe. El usuario puede haber sido eliminado.",
          });
        }
        if (err.code === "auth/wrong-password") {
          setErrorPassword({
            estado: true,
            mensaje:
              "La contraseña no es válida o el usuario no tiene una contraseña.",
          });
        }
      });
  };

  return (
    <div className={classes.root}>
      <div className="App-header-login">
        <Grid container justify="flex-end" alignItems="flex-start">
          <Grid item xs={12} sm={8}>
            <h1 className={classes.bienvenido}>¡Bienvenido </h1>
            <h1 className={classes.grupoDrive}>a Grupo Driver!</h1>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div>
              <Paper elevation={0} className={classes.paper}>
                <div>
                  <img src={Logo} className={classes.imagen} />
                  <div>
                    {errorEmail.estado ? (
                      <TextField
                        error
                        className={classes.input}
                        id="standard-required"
                        name="correo"
                        label="Correo"
                        variant="outlined"
                        value={values.correo}
                        onChange={handleInputChange}
                        helperText={errorEmail.mensaje}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <TextField
                        required
                        className={classes.input}
                        id="standard-required"
                        name="correo"
                        label="Correo"
                        variant="outlined"
                        value={values.correo}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    {errorPassword.estado ? (
                      <TextField
                        error
                        className={classes.input}
                        id="standard-password-input"
                        name="password"
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        value={values.password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                        helperText={errorPassword.mensaje}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <TextField
                        required
                        className={classes.input}
                        id="standard-password-input"
                        name="password"
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        value={values.password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </div>
                  <Button
                    className={classes.boton}
                    variant="contained"
                    color="default"
                    onClick={autenticar}
                  >
                    Ingresar
                  </Button>
                </div>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default withRouter(Login);
