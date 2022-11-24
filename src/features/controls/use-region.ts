import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { setRegion } from "./controls-slice";
import { selectRegion } from "./controls-selectors";
import { CountryOption } from "./CustomSelect";
import { Regions } from "types";
import { ActionMeta } from "react-select";

export const useRegion = (): [Regions | "", any] => {
  const dispatch = useAppDispatch();
  const region = useSelector(selectRegion);

  const handleSelect = (reg: any) => {
    if (reg) {
      dispatch(setRegion(reg?.value));
    } else {
      dispatch(setRegion(""));
    }
  };

  return [region, handleSelect];
};
