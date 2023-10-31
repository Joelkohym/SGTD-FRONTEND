import React from "react";
import { OverlayLayer } from "./Popup";
import { BallTriangle } from "react-loader-spinner";
import AppColors from "../styles/colors";

const Loader = () => {
  return (
    <OverlayLayer>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color= {AppColors.ThemeGreen}
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </OverlayLayer>
  );
};

export default React.memo(Loader);
