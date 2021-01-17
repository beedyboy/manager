import React from 'react';
import { Route } from '../../views/Admin/VacationApplication/Components/node_modules/react-router-dom';  

const NormalRoute = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => ( 
        <Layout>
          <Component {...matchProps} />
        </Layout>
         
      )}
    />
  );
};
 

export default NormalRoute;
