import React from "react";
import { Route, Redirect } from "react-router-dom";
import Utility from "../../services/UtilityService";

const PrivateRoute = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        Utility.get("staff_token") ? (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
