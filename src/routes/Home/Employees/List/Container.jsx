// Components
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Request } from "./Request";

export const Container = () => {
  window.history.replaceState({}, document.title);
  const location = useLocation();
  const [pageType, setPageType] = useState("Request");

  return (
    <>
      {pageType === "Home" ? (
        <div>Home</div>
      ) : pageType === "Request" ? (
        <Request />
      ) : null}
    </>
  );
};
