import {FormEvent} from "react";
import {Promiseable} from "@/types";

export const submitForm = (callback: (formData: FormData) => Promiseable<void>) => (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  callback(new FormData(e.currentTarget))
}

export const idify = <T>(e: T) => ({...e, id: Math.random()})