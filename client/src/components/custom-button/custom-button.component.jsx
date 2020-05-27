import React from "react";

import { CustomButtonContainer } from "./custum-button.styles";

const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
