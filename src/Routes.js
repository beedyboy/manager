import React from 'react';
import { Switch, Redirect } from 'react-router-dom'; 
import MainLayout from './templates/MainLayout/MainLayout';
import NormalLayout from './templates/NormalLayout/NormalLayout';
import { 
    Dashboard as DashboardView,
    SignIn as SignInView,
    NotFound as NotFoundView,
    Branch as BranchView,
    Department as DepartmentView,
    Category as CategoryView,
    Staff as StaffView
   
 } from './views';
import { PrivateRoute, NormalRoute } from './HOC';


const Routes = () => {
    return (
        <Switch>
            <Redirect
                exact
                from="/"
                to="/dashboard"
            />
            <PrivateRoute
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/dashboard"
          />
          <PrivateRoute
                component={BranchView}
                exact
                layout={MainLayout}
                path="/branch"
          />
           <PrivateRoute
                component={CategoryView}
                exact
                layout={MainLayout}
                path="/category"
          />
            <PrivateRoute
                component={DepartmentView}
                exact
                layout={MainLayout}
                path="/department"
          />
          <PrivateRoute
                component={StaffView}
                exact
                layout={MainLayout}
                path="/staff"
          />
           <NormalRoute
                component={SignInView}
                exact
                layout={NormalLayout}
                path="/sign-in"
            />
          <NormalRoute
            component={NotFoundView}
            exact
            layout={NormalLayout}
            path="/not-found"
        /> 
      <Redirect to="/not-found" />
        </Switch>
    )
}
export default Routes;