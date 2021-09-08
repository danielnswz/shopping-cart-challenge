import React from "react";
import { ReactComponent as DeleteSVG } from "./delete.svg";
import "./DeleteStroke.scss";
interface Props {
  onClick: () => void;
}
export const DeleteStroke: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="delete-stroke">
      <button onClick={onClick}>
        <DeleteSVG />
      </button>
    </div>
  );
};
