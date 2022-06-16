import "./container.css";
import { IContainerProps } from "./container.interfaces";

export function Container({ children }: IContainerProps): JSX.Element {
  return (
    <div className="container">
      {children}
    </div>
  )
}
