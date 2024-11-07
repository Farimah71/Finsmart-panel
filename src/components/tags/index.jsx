import TimesIcon from "../../assets/images/times.png";

export const Tags = ({ tags }) => {
  // ---------- render jsx ----------
  return (
    <div className="flex items-center gap-x-12">
      {tags?.map((tag) => (
        <div className="relative p-3 bg-white rounded-10">
          <p>{tag}</p>
          <span className="absolute -top-4 -right-4 cursor-pointer"><img src={TimesIcon} alt="times"/></span>
        </div>
      ))}
    </div>
  );
};
