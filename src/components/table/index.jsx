import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const Table = ({
  cols,
  data,
  expandable,
  expandedComponent,
  noHeadRows,
  expandableDisabled,
}) => {
  // ----------store---------
  const { theme } = useSelector((state) => state.themeSlice);

  // ---------- hooks ----------
  const { t } = useTranslation();

  const NoData = () => (
    <h4 className="text-16 text-custom-blue pb-3 text-center dark:bg-custom-dark w-full">
      {t("table.no_data")}
    </h4>
  );

  // ---------- variables ----------
  const customStyles = {
    rows: {
      style: {
        backgroundColor: theme == "dark" ? "#212529" : "white",
        minHeight: "57px",
        padding: "15px 0",
        "&:not(:last-child)": {
          borderBottom: "1px dashed rgba(220,220,220) !important",
        },
      },
    },
    headCells: {
      style: {
        padding: "0 8px",
        fontSize: "15px",
        color: theme == "dark" ? "#e9ecef" : "#99a1b7",
        border: "0 !important",
        borderBottom: "none !important",
        backgroundColor: theme == "dark" ? "#343a40" : "inherit",
      },
    },
    cells: {
      style: {
        padding: "0 8px",
        color: "#262323",
        fontWeight: "500",
      },
    },
    ExpanderButton: {
      style: {
        // backgroundColor: "transparent",
      },
    },
    headRow: {
      style: {
        display: noHeadRows && "none",
      },
    },
  };

  // ---------- render jsx ----------
  return (
    data && (
      <DataTable
        columns={cols}
        className="w-full overflow-hidden"
        data={data}
        customStyles={customStyles}
        noDataComponent={NoData()}
        highlightOnHover={theme == "light"}
        expandableRows={expandable}
        expandableRowsComponent={expandable && expandedComponent}
        expandableRowDisabled={expandableDisabled}
      />
    )
  );
};
