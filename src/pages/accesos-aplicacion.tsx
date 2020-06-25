import React, { useState, useEffect, forwardRef } from "react";
import { db } from "../services/firebase";
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
import AlertDialog from "../components/modal";
import ExportCSV from "../components/ExportCSV";
import Grid from "@material-ui/core/Grid";

interface Row {
  id: string;
  nombres: string;
  codigo: string;
  fechaNacimiento: Date;
  correoElectronico: string;
  facebook: string;
  curso: string;
  registroApp: boolean;
  activo: boolean;
}
interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

function AccesosAplicacion() {
  const [dialog, setDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const [messageDialog, setMessageDialog] = useState("");
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
  const checkValidValues = (obj: any) => {
    let check = false;
    if (
      obj.nombres != "" &&
      obj.codigo != "" &&
      obj.fechaNacimiento != null &&
      obj.correoElectronico != "" &&
      obj.facebook != "" &&
      obj.curso != undefined &&
      obj.curso != "Ninguno"
    ) {
      check = true;
    }
    return check;
  };
  let arraccesos: any = [];
  let arrayAccesosTabla: any = [];
  const [arrayAccesos, setArrayAccesos] = useState([]);
  let cursosColumns: any = { Ninguno: "Ninguno" };
  let cursosArray: any = [];

  const obtenerAccesosFirebase = (callback: any) => {
    arraccesos = [];
    //Obtener Cursos
    db.collection("Cursos")
      .get()
      .then((res: any) => {
        res.forEach((curso: any) => {
          cursosColumns[curso.id] = curso.data().titulo;
          cursosArray.push({
            id: curso.id,
            titulo: curso.data().titulo,
          });
        });
        //Obtener Personas
        db.collection("Personas")
          .get()
          .then((res: any) => {
            res.forEach((doc: any) => {
              //Completar array de Personas
              arraccesos.push({
                id: doc.id,
                nombres: doc.data().nombres,
                codigo: doc.data().codigo,
                fechaNacimiento: new Date(
                  `${doc.data().fechaNacimiento.split("-")[1]}/${
                    doc.data().fechaNacimiento.split("-")[2]
                  }/${doc.data().fechaNacimiento.split("-")[0]}`
                ),
                correoElectronico: doc.data().correoElectronico,
                facebook: doc.data().facebook,
                curso: !!cursosColumns[doc.data().curso]
                  ? doc.data().curso
                  : "Ninguno",
                registroApp: doc.data().registroApp,
                activo: doc.data().activo,
              });
              //Completar array para tabla a Excel
              arrayAccesosTabla.push({
                Nombres: doc.data().nombres,
                Código: doc.data().codigo,
                "Fecha de nacimiento": `${
                  doc.data().fechaNacimiento.split("-")[1]
                }/${doc.data().fechaNacimiento.split("-")[2]}/${
                  doc.data().fechaNacimiento.split("-")[0]
                }`,
                "Correo electrónico": doc.data().correoElectronico,
                Facebook: doc.data().facebook,
                Curso: !!cursosColumns[doc.data().curso]
                  ? cursosColumns[doc.data().curso]
                  : "Ninguno",
                "Registrado en la aplicación": doc.data().registroApp,
                Activo: doc.data().activo,
              });
            });
            setArrayAccesos(arrayAccesosTabla);
            callback(arraccesos);
          });
      });
  };

  useEffect(() => {
    obtenerAccesosFirebase((arraccesos: any) => {
      //Completar tabla
      setState({
        columns: [
          { title: "Nombres", field: "nombres" },
          { title: "Código", field: "codigo" },
          {
            title: "Fecha de nacimiento",
            field: "fechaNacimiento",
            type: "date",
          },
          { title: "Correo electrónico", field: "correoElectronico" },
          { title: "Facebook", field: "facebook" },
          {
            title: "Curso",
            field: "curso",
            lookup: cursosColumns,
          },
          {
            title: "Registro en la aplicación",
            field: "registroApp",
            type: "boolean",
          },
          { title: "Activo", field: "activo", type: "boolean" },
        ],
        data: arraccesos,
      });
    });
  }, [dialog]);

  return (
    <div className="App">
      <div className="App-header">
        <div>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <ExportCSV
              csvData={arrayAccesos}
              fileName="GrupoDriver_AccesosAplicacion"
            />
          </Grid>
          <MaterialTable
            title="Accesos a la Aplicación"
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
                new Promise((resolve, reject) => {
                  setDialog(false);
                  setTimeout(() => {
                    if (!checkValidValues(newData)) {
                      setTitleDialog("Error");
                      setMessageDialog("Todos los campos son obligatorios.");
                      setDialog(true);
                      reject();
                    } else {
                      setState((prevState: TableState) => {
                        const data = [...prevState.data];
                        //Agregar nuevo registro a Firebase
                        db.collection("Personas")
                          .add({
                            activo: !newData.activo ? false : newData.activo,
                            registroApp: !newData.registroApp
                              ? false
                              : newData.registroApp,
                            nombres: newData.nombres,
                            codigo: newData.codigo,
                            fechaNacimiento: new Date(newData.fechaNacimiento)
                              .toISOString()
                              .split("T")[0],
                            correoElectronico: newData.correoElectronico,
                            facebook: newData.facebook,
                            curso: newData.curso,
                          })
                          .then((res) => {
                            newData.id = res.id;
                            setTitleDialog("Mensaje del sistema");
                            setMessageDialog(
                              "Registro realizado correctamente."
                            );
                            setDialog(true);
                          })
                          .catch((err) => {
                            setTitleDialog("Mensaje del sistema");
                            setMessageDialog(
                              "Ocurrió un error, por favor contactar con el administrador del sistema.\nError: Table.AccesosApplicaciones.onRowAdd"
                            );
                            setDialog(true);
                            console.log(err);
                          });
                        data.push(newData);
                        return { ...prevState, data };
                      });
                      resolve();
                    }
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setDialog(false);
                  setTimeout(() => {
                    if (!checkValidValues(newData)) {
                      setTitleDialog("Error");
                      setMessageDialog("Todos los campos son obligatorios.");
                      setDialog(true);
                      reject();
                    } else {
                      if (oldData) {
                        setState((prevState: TableState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          //Actualizar registro en Firebase
                          db.collection("Personas")
                            .doc(newData.id)
                            .update({
                              activo: newData.activo,
                              registroApp: newData.registroApp,
                              nombres: newData.nombres,
                              codigo: newData.codigo,
                              fechaNacimiento: new Date(newData.fechaNacimiento)
                                .toISOString()
                                .split("T")[0],
                              correoElectronico: newData.correoElectronico,
                              facebook: newData.facebook,
                              curso: newData.curso,
                            })
                            .then((res) => {
                              setTitleDialog("Mensaje del sistema");
                              setMessageDialog(
                                "Actualización realizada correctamente."
                              );
                              setDialog(true);
                            })
                            .catch((err) => {
                              setTitleDialog("Mensaje del sistema");
                              setMessageDialog(
                                "Ocurrió un error, por favor contactar con el administrador del sistema.\nError: Table.AccesosApplicaciones.onRowUpdate"
                              );
                              setDialog(true);
                              console.log(err);
                            });
                          return { ...prevState, data };
                        });
                      }
                      resolve();
                    }
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setDialog(false);
                  setTimeout(() => {
                    resolve();
                    setState((prevState: TableState) => {
                      const data = [...prevState.data];
                      //Eliminar registro en Firebase
                      db.collection("Personas")
                        .doc(oldData.id)
                        .delete()
                        .then((res) => {
                          setTitleDialog("Mensaje del sistema");
                          setMessageDialog("Registro eliminado correctamente.");
                          setDialog(true);
                        })
                        .catch((err) => {
                          setTitleDialog("Mensaje del sistema");
                          setMessageDialog(
                            "Ocurrió un error, por favor contactar con el administrador del sistema.\nError: Table.AccesosApplicaciones.onRowDelete"
                          );
                          setDialog(true);
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
      {dialog && (
        <AlertDialog
          estado={dialog}
          titulo={titleDialog}
          mensaje={messageDialog}
        ></AlertDialog>
      )}
    </div>
  );
}

export default AccesosAplicacion;
