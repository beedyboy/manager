import React, { useContext, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import DirectorStore from "../../../stores/DirectorStore"; 
import DirectorList from "./Components/DirectorList";

const Director = () => {
  const dirStore = useContext(DirectorStore);
  const { info: directors } = dirStore; 
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Directors List</h5>
            </Col>
            
          </Row>
        </CardHeader>
        <CardBody>
          <Row className="mt-2">
            {directors &&
              directors.map((director) => (
                <Col xl="3" md="6" className="mb-4" key={director.uid}>
                  <DirectorList
                    data={director} 
                  />
                </Col>
              ))}
          </Row>
        
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(Director);
