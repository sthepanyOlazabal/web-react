import React, { useState, useEffect, forwardRef } from "react";
import { db } from "../../services/firebase";
import MaterialTable, { Column, Icons } from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

interface Row {
  id: string;
  titulo: string;
  imagen: string;
  enlace: string;
  activo: boolean;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

function PodcastsCircuito() {
  const [state, setState] = useState<TableState>({
    columns: [],
    data: [],
  });
  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  let podcastsCircuito: any = [];

  useEffect(() => {
    //Obtener PodcastsCircuito
    db.collection("PodcastsCircuito")
      .get()
      .then((res: any) => {
        res.forEach((curso: any) => {
          podcastsCircuito.push({
            id: curso.id,
            titulo: curso.data().titulo,
            imagen: curso.data().imagen,
            enlace: curso.data().enlace,
            activo: curso.data().activo,
          });
        });
        //Completar tabla
        setState({
          columns: [
            { title: "Título", field: "titulo" },
            { title: "Imagen de portada", field: "imagen" },
            { title: "Enlace del Podcast", field: "enlace" },
            { title: "Activo", field: "activo", type: "boolean" },
          ],
          data: podcastsCircuito,
        });
      });
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div>
          <MaterialTable
            title="Podcasts desarrollo del Circuito"
            columns={state.columns}
            data={state.data}
            icons={tableIcons}
            localization={{
              pagination: {
                labelDisplayedRows: "{from}-{to} de {count}",
                labelRowsSelect: "filas",
                labelRowsPerPage: "Filas por página",
                firstAriaLabel: "Primera Página",
                firstTooltip: "Primera Página",
                previousAriaLabel: "Anterior",
                previousTooltip: "Anterior",
                nextAriaLabel: "Siguiente",
                nextTooltip: "Siguiente",
                lastAriaLabel: "Última Página",
                lastTooltip: "Última Página",
              },
              toolbar: {
                nRowsSelected: "{0} fila(s) seleccionadas",
                searchTooltip: "Buscar",
                searchPlaceholder: "Buscar",
              },
              header: {
                actions: "Acciones",
              },
              body: {
                emptyDataSourceMessage: "Sin resultados.",
                filterRow: {
                  filterTooltip: "Filtrar",
                },
                addTooltip: "Agregar",
                editTooltip: "Editar",
                editRow: {
                  deleteText:
                    "¿Desea continuar con la eliminación de este registro?",
                  cancelTooltip: "Cancelar",
                  saveTooltip: "Guardar",
                },
                deleteTooltip: "Eliminar",
              },
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState: TableState) => {
                      const data = [...prevState.data];
                      //Agregar nuevo registro a Firebase
                      db.collection("PodcastsCircuito")
                        .add({
                          titulo: newData.titulo,
                          imagen: newData.imagen,
                          enlace: newData.enlace,
                          activo: !!newData.activo ? newData.activo : false,
                        })
                        .then((res) => {
                          newData.id = res.id;
                          alert("Registro agregado correctamente");
                        })
                        .catch((err) => {
                          alert(
                            "Ocurrió un error, por favor contactar con el administrador del sistema.\nError: Table.PodcastsCircuito.onRowAdd"
                          );
                          console.log(err);
                        });
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState((prevState: TableState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        //Actualizar registro en Firebase
                        db.collection("PodcastsCircuito")
                          .doc(newData.id)
                          .update({
                            titulo: newData.titulo,
                            imagen: newData.imagen,
                            enlace: newData.enlace,
                            activo: newData.activo,
                          })
                          .then((res) => {
                            alert("Registro actualizado correctamente.");
                          })
                          .catch((err) => {
                            alert(
                              "Ocurrió un error, por favor contactar con el administrador del sistema.\nError: Table.PodcastsCircuito.onRowUpdate"
                            );
                            console.log(err);
                          });
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState: TableState) => {
                      const data = [...prevState.data];
                      //Eliminar registro en Firebase
                      db.collection("PodcastsCircuito")
                        .doc(oldData.id)
                        .delete()
                        .then((res) => {
                          alert("Registro eliminado correctamente.");
                        })
                        .catch((err) => {
                          alert(
                            "Ocurrió un error, por favor contactar con el administrador del sistema.\nError: Table.PodcastsCircuito.onRowDelete"
                          );
                          console.log(err);
                        });
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PodcastsCircuito;
