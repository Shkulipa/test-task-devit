import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IErrorMsg extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
  children: ReactNode;
}