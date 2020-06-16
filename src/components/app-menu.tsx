import React from "react";
import List from "@material-ui/core/List";

import OPCIONES_MENU from "../data/rutas";
import AppMenuItem from "./app-menu-item";

function AppMenu(props: any) {
  const cerrarMenu = () => {
    props.data(false);
  };

  return (
    <List>
      {OPCIONES_MENU.map((value, index) => (
        <AppMenuItem
          rutas={value}
          rutaIndice={index}
          key={index}
          cerrarMenu={cerrarMenu}
        />
      ))}
    </List>
  );
}

export default AppMenu;
