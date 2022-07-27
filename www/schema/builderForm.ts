import { LabelType } from 'www/components/LabelForm';
import { object, string, number, InferType, mixed, array } from 'yup';

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
