import "./errorMsg.css";
import cn from "classnames";
import { IErrorMsg } from './errorMsg.interfaces'

export function ErrorMsg({ children, className, ...props }: IErrorMsg):JSX.Element {
  return (
    <div className={cn("err", className)} {...props}>{children}</div>
  )
}
