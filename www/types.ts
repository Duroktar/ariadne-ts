import { LabelType } from "www/components/LabelForm";
import { ErrorKind } from "www/schema/builderForm";

export type BuilderState = {
  code: number;
  labels: (LabelType | undefined)[];
  message: string;
  errorKind: ErrorKind;
  src_id: string;
  offset: number;
  note?: string;
};
