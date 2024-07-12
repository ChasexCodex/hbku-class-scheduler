import {useState} from 'react'
import _ from 'lodash'

const stateOperation = <T>(setValue: (value: T) => void, newValue: T) => {
  setValue(newValue)
  return newValue
}

export const useArrayState = <T>(initialValue: T[] | (() => T[]) = []) => {
  const [value, setValue] = useState(initialValue)
  const add = (item: T) => stateOperation(setValue, _.concat(value, item))
  const remove = (index: number) => stateOperation(setValue, _.filter(value, (_, i) => i !== index))
  const update = (updatedItem: T, index: number) => stateOperation(setValue, _.cloneDeep(_.set(value, index, updatedItem)))

  return {value, setValue, add, remove, update}
}

export const useObjectState = <T extends object>(initialState: T | (() => T)) => {
  const [value, setValue] = useState(initialState)

  const updateField = <F extends keyof T>(field: F, value: T[F], callback?: (newState: T) => void) => {
    setValue(prevState => {
      const newState = _.cloneDeep(_.set(prevState, field, value))
      callback?.(newState)
      return newState
    })
  }

  return {value, setValue, updateField}
}