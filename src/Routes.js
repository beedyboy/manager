import React from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import MainLayout from "./templates/MainLayout/MainLayout";
import NormalLayout from "./templates/NormalLayout/NormalLayout";
import { createBrowserHistory } from "history";
import {
  Admin as AdminView,
  Asset as AssetView,
  Dashboard as DashboardView,
  LeaveApplication as LeaveApplicationView,
  LeaveAppDetails as LeaveAppDetailsView,
  LeaveAppManager as LeaveAppManagerView,
  NotFound as NotFoundView,
  Maintenance as MaintenanceView,
  Onboarding as OnboardingView,
  POS as POSView,
  Product as ProductView,
  ProductDetails as ProductDetailsView,
  Profile as ProfileView,
  Report as ReportView,
  ResetRequest as ResetRequestView,
  SignIn as SignInView,
  Staff as StaffView,
  Ticket as TicketView,
  TicketAdmin as TicketAdminView,
} from "./views";
import { PrivateRoute, NormalRoute } from "./HOC";
import AssetDetails from "./views/Asset/Components/AssetDetails";
import AdminTicketDetails from "./views/TicketAdmin/Components/AdminTicketDetails";
import StaffDetails from "./views/Staff/Components/StaffDetails"; 

const Routes = () => {
  const browserHistory = createBrowserHistory();
  return (
     <Router history={browserHistory}>
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <PrivateRoute
        component={AdminView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute
        component={LeaveApplicationView}
        exact
        layout={MainLayout}
        path="/vacations"
      />
      <PrivateRoute
        component={LeaveAppDetailsView}
        exact
        layout={MainLayout}
        path="/vacation-applications/:id/:user/:leave/:type"
      />
      <PrivateRoute
        component={LeaveAppManagerView}
        exact
        layout={MainLayout}
        path="/vacation-applications"
      />
      <PrivateRoute
        component={OnboardingView}
        exact
        layout={MainLayout}
        path="/onboarding"
      />
      <PrivateRoute
        component={ProfileView}
        exact
        layout={MainLayout}
        path="/profile"
      />
      <PrivateRoute
        component={StaffView}
        exact
        layout={MainLayout}
        path="/staff"
      />{" "}
      <PrivateRoute
        component={StaffDetails}
        exact
        layout={MainLayout}
        path="/staff/:id/view"
      />
      
      <PrivateRoute
        component={ProductView}
        exact
        layout={MainLayout}
        path="/product"
      />
      <PrivateRoute
        component={ProductDetailsView}
        exact
        layout={MainLayout}
        path="/product/:id"
      />
      <PrivateRoute
        component={AssetView}
        exact
        layout={MainLayout}
        path="/asset"
      />
      <PrivateRoute
        component={AssetDetails}
        exact
        layout={MainLayout}
        path="/asset/:id/view"
      />
      <PrivateRoute
        component={MaintenanceView}
        exact
        layout={MainLayout}
        path="/maintenance"
      />
      <PrivateRoute component={POSView} exact layout={MainLayout} path="/pos" />
      <PrivateRoute component={TicketView} layout={MainLayout} path="/ticket" />
      <PrivateRoute
        component={TicketAdminView}
        layout={MainLayout}
        path="/admin/ticket"
      />
      <PrivateRoute
        component={AdminTicketDetails}
        exact
        layout={MainLayout}
        path="/adminticket/view/:id"
      />
      <PrivateRoute component={ReportView} layout={MainLayout} path="/report" />
      <NormalRoute
        component={SignInView}
        exact
        layout={NormalLayout}
        path="/login"
      />
      <NormalRoute
        component={ResetRequestView}
        exact
        layout={NormalLayout}
        path="/reset-password"
      />
      <NormalRoute
        component={NotFoundView}
        exact
        layout={NormalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
 </Router>
  );
};
export default Routes;
