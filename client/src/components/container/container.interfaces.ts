import { DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface IContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}