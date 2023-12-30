import { setAuthToken } from "config/httpService";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";

// Routes
import AuthRoutes from "routes/Auth/routes";
import HomeRoutes from "routes/Home/routes";
import { verifyToken } from "./Auth/Module";

const Routes = () => {
  const { isAuthenticated, authLoading, Token } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const authRoutes = useRoutes(AuthRoutes);
  const homeRoutes = useRoutes(HomeRoutes);

  const [loading, setLoading] = useState(authLoading);
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);
  useEffect(() => {
    setLoading(authLoading);
    if (Token) {
      setAuthToken(Token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  if (loading) {
    return <div className="logoLoading">Loading...</div>;
  }
  return (
    <>
      {!isAuthenticated && authRoutes}
      {isAuthenticated && homeRoutes}
    </>
  );
};

export default Routes;
