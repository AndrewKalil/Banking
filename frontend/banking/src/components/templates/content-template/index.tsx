import React from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";

const ContentTemplate = () => {
  return (
    <main className="content_template">
      <Outlet />
    </main>
  );
};

export default ContentTemplate;
