import {useState} from "react";

export const useArrayState = <T>(initialValue: T[] | (() => T[]) = []) => {
  const [value, setValue] = useState(initialValue);
  const add = (item: T) => {
    const next = [...value, item]
    setValue(next);
    return next
  }
  const remove = (index: number) => {
    const next = value.filter((_, i) => i !== index)
    setValue(next)
    return next
  }
  const update = (updatedItem: T, index: number) => {
    const next= value.map((item, i) => index === i ? updatedItem : item)
    setValue(next);
    return next
  }

  return {value, setValue, add, remove, update}
}

export const useObjectState = <T extends object>(initialState: T | (() => T)) => {
  const [state, setState] = useState(initialState);

  const updateField = <F extends keyof T>(field: F, value: T[F]) => {
    setState(prevState => ({...prevState, [field]: value}));
  };

  return {state, updateField};
};