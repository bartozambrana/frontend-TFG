import React from "react";
import { DateItem } from "./DateItem";

export const DatesScreen = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Citas Vigentes</h1>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <DateItem bussiness={"Empresa"} date={"12-12-2022"} />
        </li>
        <li className="list-group-item">
          <DateItem bussiness={"Empresa"} date={"12-12-2022"} />
        </li>
        <li className="list-group-item">
          <DateItem bussiness={"Empresa"} date={"12-12-2022"} />
        </li>
      </ul>
    </div>
  );
};
