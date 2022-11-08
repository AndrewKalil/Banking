import React, { FC } from "react";
import "./style.scss";

interface AppTemplateProps {
  children: any;
}

const AppTemplate: FC<AppTemplateProps> = ({ children }) => {
  return <div className="app_template">{children}</div>;
};

export default AppTemplate;
