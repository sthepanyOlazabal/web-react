import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boton: {
      marginBottom: "10px",
      backgroundColor: "#00a67c",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#217346",
      },
    },
  })
);

function ExportCSV({ csvData, fileName }: any) {
  const classes = useStyles();
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData: any, fileName: any) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      variant="contained"
      className={classes.boton}
      startIcon={<CloudDownloadOutlinedIcon />}
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      Exportar a Excel
    </Button>
  );
}
export default ExportCSV;
