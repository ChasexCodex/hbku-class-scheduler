import {useState} from "react";
import _ from "lodash";

const stateOperation = <T>(setValue: (value: T) => void, newValue: T) => {
  setValue(newValue)
  return newValue
}

export const useArrayState = <T>(initialValue: T[] | (() => T[]) = []) => {
  const [value, setValue] = useState(initialValue);
  const add = (item: T) => stateOperation(setValue, _.concat(value, item))
  const remove = (index: number) => stateOperation(setValue, _.remove(value, (_, i) => i === index))
  const update = (updatedItem: T, index: number) => stateOperation(setValue, _.set(value, index, updatedItem))

  return {value, setValue, add, remove, update}
}

export const useObjectState = <T extends object>(initialState: T | (() => T)) => {
  const [value, setValue] = useState(initialState);

  const updateField = <F extends keyof T>(field: F, value: T[F], callback?: (newState: T) => void) => {
    setValue(prevState => {
      const newState = {...prevState, [field]: value};
      if (callback) callback(newState);
      return newState;
    });
  };

  return {value, setValue, updateField};
};