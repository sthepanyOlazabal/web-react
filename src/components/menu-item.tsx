import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ListItem, Collapse, Divider, List } from "@material-ui/core";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppMenuItem from "./app-menu-item";

interface IMenuItemProps {
  rutas: any;
  rutaIndice: number;
  cerrarMenu: any;
}

function MenuItem(props: IMenuItemProps) {
  const isExpandable = props.rutas.items && props.rutas.items.length > 0;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    if (!!props.rutas.ruta) props.cerrarMenu(false);
  };

  return (
    <>
      {!!props.rutas.ruta ? (
        <Link to={props.rutas.ruta} onClick={handleClick}>
          <ListItem button>
            {!!props.rutas.icono && (
              <ListItemIcon>
                <props.rutas.icono />
              </ListItemIcon>
            )}
            <ListItemText
              primary={props.rutas.titulo}
              inset={!props.rutas.icono}
            />
            {isExpandable && !open && <IconExpandMore />}
            {isExpandable && open && <IconExpandLess />}
          </ListItem>
        </Link>
      ) : (
        <ListItem button onClick={handleClick}>
          {!!props.rutas.icono && (
            <ListItemIcon>
              <props.rutas.icono />
            </ListItemIcon>
          )}
          <ListItemText
            primary={props.rutas.titulo}
            inset={!props.rutas.icono}
          />
          {isExpandable && !open && <IconExpandMore />}
          {isExpandable && open && <IconExpandLess />}
        </ListItem>
      )}

      {isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            {props.rutas.items.map((value: any, index: number) => (
              <AppMenuItem
                rutas={value}
                rutaIndice={index}
                key={index}
                cerrarMenu={props.cerrarMenu}
              />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}

export default MenuItem;
