import { useLocation, useParams } from "react-router-dom";

export const useRouteSubscriber = () => {
  const location = useLocation();
  const params = useParams();
  let routeInfo = {
    id: params.id ? params.id : "",
    path: location.pathname.split("/")[1],
    isDetailSpecific: params.id !== undefined && parseInt(params.id) > 0,
  };

  return routeInfo;
};
