import * as React from "react";
import { Switch, Route } from "react-router-dom";

interface IRutasProps {
  rutas: any;
}

let count: number = 0;
let arrmenuitems: any = [];

const getMenu = (menu: any) => {
  menu.map(function (value: any) {
    if (!!value.ruta === false && !!value.pagina === false) {
      getMenu(value.items);
    } else {
      arrmenuitems.push(value);
    }
  });
};

export default class Rutas extends React.Component<IRutasProps> {
  constructor(props: IRutasProps) {
    super(props);
  }

  public render() {
    if (count <= 2) count++;
    if (count == 1) {
      getMenu(this.props.rutas);
    }

    return (
      <Switch>
        {arrmenuitems.map((item: any, index: number) => {
          return <Route path={item.ruta} component={item.pagina} key={index} />;
        })}
      </Switch>
    );
  }
}
