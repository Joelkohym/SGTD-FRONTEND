import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import styled, { css } from "styled-components";
import Button from "../components/Button";
import { Section, sharedButtonStyle, sharedFlexCenter } from "../styles/global";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import AppColors from "../styles/colors";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PDFColumns, columns } from "../lib/tableData";
import { useLocation } from "react-router-dom";
import { useMakePOSTRequest } from "../hooks/useMakePostRequest";
import { API_Methods } from "../lib/constants";
import { useAtom } from "jotai";
import { loaderAtom } from "../jotai/store";
import Loader from "../components/Loader";
import * as XLSX from "xlsx";

function TableView() {
  const { state } = useLocation();
  const { imo } = state;
  const [getVesselTableData] = useMakePOSTRequest();
  const [tableData, setTableData] = useState<any>([]);
  const [isLoading, setIsLoading] = useAtom(loaderAtom);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    getTableData();
  }, [imo]);

  const getTableData = async () => {
    setIsLoading(true);
    try {
      let res: any = await getVesselTableData(API_Methods.Table_view, {
        imo: imo,
      });
      if (res) {
        setTableData(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error");
    }
  };

  const exportToPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Table Title";
    doc.text(title, marginLeft, 25);
    autoTable(doc, {
      body: [...filteredData],
      columns: PDFColumns,
    });
    doc.save("Vessel Request Data.pdf");
  };

  const csvData = useMemo(() => {
    const rows =
      filteredData.length > 0
        ? filteredData.map((data: any) => [
            data.index + 1,
            data.duetoArriveTime,
            data.locationFrom,
            data.vesselName,
            data.callSign,
            data["IMO number"],
            data.flag,
            data.dueToDepartTime,
          ])
        : [];
    return [
      [
        "INDEX",
        "Due To Arrive Time",
        "locationFrom",
        "Vessel Name",
        "Call Sign",
        "IMO number",
        "Flag",
        "Due To Depart Time",
      ],
      ...rows,
    ];
  }, [filteredData]);

  const copyTable = () => {
    const elTable = document.querySelector("table");
    let range, sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel && sel.removeAllRanges();
      if (elTable && sel) {
        try {
          range.selectNodeContents(elTable);
          sel.addRange(range);
        } catch (e) {
          range.selectNode(elTable);
          sel.addRange(range);
        }
      }
      document.execCommand("copy");
    }

    sel && sel.removeAllRanges();

    toast.success("Copied to clipboard!!");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const blob = new Blob(
      [XLSX.write(wb, { bookType: "xlsx", type: "array" })],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Vessel Request Data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getFilteredRows = (rows: any) => {
    setFilteredData(rows.map((data: any) => data.original));
  }

  return (
    <>
      <Layout>
        <Container>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            transition={Slide}
          />
          <BtnContainer>
            <Button
              title={"PDF"}
              clickHandler={exportToPDF}
              buttonStyle={btnStyle}
            />
            <Button
              title={"EXCEL"}
              clickHandler={exportToExcel}
              buttonStyle={btnStyle}
            />
            <StyledCSVLink filename="Vessel Request Data.csv" data={csvData}>
              CSV
            </StyledCSVLink>
            <Button
              title={"COPY"}
              clickHandler={copyTable}
              buttonStyle={btnStyle}
            />
          </BtnContainer>
          {!isLoading && (
            <TableContainer>
              <Table
                title={"Table view"}
                data={tableData}
                columns={columns}
                id={"my-table"}
                getFilteredRows={getFilteredRows}
              />
            </TableContainer>
          )}
        </Container>
      </Layout>
      {isLoading && <Loader />}
    </>
  );
}

export default TableView;

const TableContainer = styled.div`
  width: 90%;
`;

const Container = styled(Section)`
  width: 100%;
`;

const BtnContainer = styled.div`
  margin: 1rem;
  align-self: flex-end;
  ${sharedFlexCenter};
  justify-content: flex-end;
`;

const btnStyle = css`
  ${sharedButtonStyle}
  width: 5rem;
  margin: 0 0.5rem;
`;

const StyledCSVLink = styled(CSVLink)`
  display: block;
  font-weight: 600;
  border-radius: 0.25rem;
  ${btnStyle}
  text-decoration: none;
  font-size: 0.8rem;
  color: ${AppColors.White};
  cursor: pointer;
  text-align: center;
  width: 4rem;
`;
