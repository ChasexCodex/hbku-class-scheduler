import {useEffect, useState} from "react";
import {getFromLocalStorage} from "@/utils/admin";

export const useArrayState = <T>(initialValue: T[] | (() => T[])) => {
  const [value, setValue] = useState(initialValue);
  const add = (item: T) => setValue([...value, item]);
  const remove = (index: number) => setValue(value.filter((_, i) => i !== index));
  const update = (updatedItem: T, index: number) => setValue(value.map((item, i) => index === i ? updatedItem : item));

  return {value, setValue, add, remove, update}
}

export const useObjectState = <T extends object>(initialState: T | (() => T)) => {
  const [state, setState] = useState(initialState);

  const updateField = <F extends keyof T>(field: F, value: T[F]) => {
    setState(prevState => ({...prevState, [field]: value}));
  };

  return {state, updateField};
};