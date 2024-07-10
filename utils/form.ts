import {ChangeEvent, FormEvent} from 'react'
import {Promiseable} from '@/types'

export const submitForm = (callback: (formData: FormData) => Promiseable<void>) => (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  callback(new FormData(e.currentTarget))
}

export const idify = <T>(e: T) => ({...e, id: Math.random()})

export const setState = (setter: (value: any) => void) =>
  (e: any) => setter(e.target.value)

type HTMLFormInputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export const handle = <T extends HTMLFormInputElement>(callback: (value: string) => void) => (e: ChangeEvent<T>) => {
  callback(e.target.value)
}