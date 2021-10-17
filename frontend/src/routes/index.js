import React, { useContext } from "react";
import { useAuth } from "../context/auth";

import SignRoutes from "./SignRoutes";
import PrivateRoutes from "./PrivateRoutes";

function Routes() {
  const { signed } = useAuth();

  return signed ? <PrivateRoutes /> : <SignRoutes />;
}

export default Routes;
