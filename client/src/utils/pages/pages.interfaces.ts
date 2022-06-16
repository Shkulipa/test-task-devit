import { ReactElement } from "react";

export interface IPage {
  path: string;
  element?: ReactElement;
  index?: boolean,
  privateRoute?: boolean;
  children?: IPage[];
}