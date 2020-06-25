import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { UseForm } from "../hooks/use-form";
import axios from "axios";
import { FCMKey } from "../services/firebase";
import AlertDialog from "../components/modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
      color: theme.palette.text.secondary,
    },
  })
);

function Notificaciones() {
  const classes = useStyles();
  const [mostrarError, setMostrarError] = useState({
    asuntoError: false,
    mensajeError: false,
  });
  const [values, handleInputChange, resetform] = UseForm({
    asunto: "",
    mensaje: "",
  });
  const [dialog, setDialog] = useState({
    estado: false,
    titulo: "",
    alerta: "",
  });

  let { asunto, mensaje } = values;
  let { asuntoError, mensajeError } = mostrarError;
  let { estado, titulo, alerta } = dialog;

  const enviar = () => {
    if (asunto.length > 0 && mensaje.length > 0) {
      axios({
        headers: {
          Authorization: `key=${FCMKey}`,
        },
        method: "post",
        url: "https://fcm.googleapis.com/fcm/send",
        data: {
          to: "/topics/grupo_driver_noticias",
          notification: {
            title: asunto,
            body: mensaje,
          },
        },
      })
        .then(() => {
          setDialog({
            estado: true,
            titulo: "Mensaje del sistema",
            alerta: "Notificación enviada correctamente.",
          });
          resetform();
        })
        .catch((err: any) => {
          console.log(err);
          setDialog({
            estado: true,
            titulo: "Error",
            alerta: "Ocurrió un error en el envío de la notificación.",
          });
        });
    } else {
      setMostrarError({
        asuntoError: asunto.length <= 0 ? true : false,
        mensajeError: mensaje.length <= 0 ? true : false,
      });
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <div>
          <Paper elevation={4} className={classes.paper}>
            <div>
              <h3>Enviar notificaciones</h3>
              <div>
                {asuntoError ? (
                  <TextField
                    error
                    className={classes.input}
                    id="standard-required"
                    name="asunto"
                    label="Asunto"
                    variant="outlined"
                    value={asunto}
                    onChange={handleInputChange}
                    helperText="Escriba un asunto."
                  />
                ) : (
                  <TextField
                    required
                    className={classes.input}
                    id="standard-required"
                    name="asunto"
                    label="Asunto"
                    variant="outlined"
                    value={asunto}
                    onChange={handleInputChange}
                  />
                )}
                {mensajeError ? (
                  <TextField
                    error
                    multiline
                    rows={4}
                    className={classes.input}
                    id="standard-password-input"
                    name="mensaje"
                    label="Mensaje"
                    variant="outlined"
                    value={mensaje}
                    onChange={handleInputChange}
                    helperText="Ingrese un mensaje."
                  />
                ) : (
                  <TextField
                    required
                    multiline
                    rows={4}
                    className={classes.input}
                    id="standard-password-input"
                    name="mensaje"
                    label="Mensaje"
                    variant="outlined"
                    value={mensaje}
                    onChange={handleInputChange}
                  />
                )}
              </div>
              <Button
                className={classes.boton}
                variant="contained"
                color="default"
                startIcon={<SendIcon />}
                onClick={enviar}
              >
                Enviar
              </Button>
            </div>
          </Paper>
        </div>
      </div>
      {estado && (
        <AlertDialog
          estado={estado}
          titulo={titulo}
          mensaje={alerta}
        ></AlertDialog>
      )}
    </div>
  );
}

export default Notificaciones;
