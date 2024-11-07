import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export const Modal = ({ state, onCloseModal, children, modalName, small }) => {
  // ---------- store ----------
  let theme = useSelector((state) => state.themeSlice.theme);

  // ---------- variables ----------
  const contentStyle = {
    background: theme == "dark" ? "#212529" : "#fff",
    borderRadius: "10px",
    border: "none",
    maxHeight: "95vh",
    width: small ? "500px" : "900px",
    // maxWidth: "95%",
    overflow: "visible",
    padding: "0",
    display: "flex",
    flexDirection: "column",
  };

  // ---------- render jsx ----------
  return (
    <Popup
      open={state}
      position="center center"
      modal
      onClose={() => onCloseModal()}
      {...{ contentStyle }}
      className="dark:bg-dark_custom-average-black"
      closeOnDocumentClick={modalName !== "createUser"}
    >
      {children}
    </Popup>
  );
};
