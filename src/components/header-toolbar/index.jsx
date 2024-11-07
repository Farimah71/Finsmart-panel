import { PageTitle, ThemeBox, NotificationAlert } from "..";

export const HeaderToolbar = () => {
  // ---------- render JSX -----------
  return (
    <div className="flex w-full px-8 items-center justify-between dark:bg-dark_custom-light-black">
      <PageTitle />
      <div className="flex gap-x-2">
        <NotificationAlert />
        <ThemeBox />
      </div>
    </div>
  );
};
