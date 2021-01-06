import React, { useState, Fragment } from "react";
import { Card, CardBody, ButtonGroup, Button, Row, Col } from "reactstrap"; 
import Director from "./Director/Director";
import Document from "./Document/Document"; 

const Onboarding = () => {
  const [activeTab, setActiveTab] = useState("director");
  return (
    <Fragment>
      <Card className="mt-2">
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              <ButtonGroup className="border border-secondary rounded">
                <Button
                  color={activeTab === "director" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("director")}
                >
                  Director
                </Button>
                <Button
                  color={activeTab === "document" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("document")}
                >
                  Document
                </Button>
               
              </ButtonGroup>
              <div className="card-block mt-2  border-right">
                 
                <div className={activeTab === "director" ? "active" : "d-none"}>
                  <Director />
                </div>

                <div className={activeTab === "document" ? "active" : "d-none"}>
                  {/* <Document /> */}
                </div>

               
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Onboarding;
