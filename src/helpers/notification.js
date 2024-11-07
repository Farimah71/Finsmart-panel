import { toast } from "react-toastify";

export const successNotification = (title) => {
  return toast.success(title, {
    position: "bottom-left",
    theme: "colored",
    draggable: false,
  });
};
export const errorNotification = (title) => {
  return toast.error(title, {
    position: "bottom-left",
    theme: "colored",
    draggable: false,
  });
};
export const warningNotification = (title) => {
  return toast.warn(title, {
    position: "bottom-left",
    theme: "colored",
    draggable: false,
  });
};
