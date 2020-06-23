import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    contenedor: {
      height: "100%",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
    },
    titulo: {
      fontSize: "10rem",
      margin: "0px",
    },
    descripcion: {
      color: theme.palette.text.secondary,
      fontSize: "1.5rem",
    },
    button: {
      margin: theme.spacing(3),
    },
  })
);

function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8} sm={6}>
          <div className="App-header-not-found"></div>
        </Grid>
        <Grid item xs={4} sm={6}>
          <div className={classes.contenedor}>
            <h1 className={classes.titulo}>404</h1>
            <div className={classes.descripcion}>
              <div>Página no encontrada</div>
            </div>
            <Button
              variant="contained"
              component={Link}
              to="/"
              color="default"
              className={classes.button}
              startIcon={<HomeIcon />}
            >
              Regresar a Inicio
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default NotFound;
