import React, { FC } from "react";
import { Link } from "react-router-dom";

import BackSVG from "../assets/back-icon.svg";
import "./BackButton.scss";
export const BackButton: FC = () => {
  return (
    <span className="backBtn">
      <Link to="/">
        Back
      </Link>
    </span>
  );
};