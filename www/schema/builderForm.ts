import { array, InferType, mixed, number, object, string } from 'yup';
import { LabelType } from '../components/LabelForm';

export enum ErrorKind {
  Error = "Error",
  Warning = "Warning",
  Advice = "Advice",
  Custom = "Custom",
}

export const builderFormSchema = object({
  errorKind: mixed<ErrorKind>().oneOf(Object.values(ErrorKind)).required(),
  code: number().positive().integer(),
  message: string().required(),
  src_id: string(),
  offset: number().positive().integer().required(),
  note: string(),
  labels: array<LabelType>().required(),
});

export type BuilderForm = InferType<typeof builderFormSchema>;
