import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { setTheme, Theme } from "./theme-slice";
import { selectTheme } from "./theme-selector";

export const useTheme = (): [Theme, () => void] => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const toggleTheme = (): void =>
    void dispatch(setTheme(theme === "light" ? "dark" : "light"));

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
};
