import { PuffLoader  } from "react-spinners";

export const Loading = () => {
  // ---------- render jsx ----------
  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-white flex items-center justify-center z-50">
      <PuffLoader color="#95ebf5" />
    </div>
  );
};
