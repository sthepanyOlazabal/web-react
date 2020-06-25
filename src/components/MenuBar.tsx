import React, { useContext, useState } from "react";
import DrawerGD from "./Drawer";
import { AppBar } from "@material-ui/core";
import ToolbarGD from "./Toolbar";
import { GlobalContext } from "../global/GlobalContext";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
const MenuBar = () => {
  const classes = useStyles();
  let { usuario, setUsuario } = useContext(GlobalContext);
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

  return (
    <>
      {usuario.estaAutenticado && (
        <div className={classes.root}>
          <AppBar position="static">
            <ToolbarGD toggleDrawer={toggleDrawer} />
          </AppBar>
        </div>
      )}

      <DrawerGD setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default MenuBar;
