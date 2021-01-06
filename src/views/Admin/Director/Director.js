import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap";
import DirectorStore from "../../../stores/DirectorStore";
import AddDirector from "./Components/AddDirector";
import DirectorList from "./Components/DirectorList";

const Director = () => {
  const dirStore = useContext(DirectorStore);
  const { info: directors, removeDirector } = dirStore;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const createDirector = () => {
    setModal(true);
    setMode("Add");
  };
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Director Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12">
              <Button
                color="secondary"
                className="float-right"
                onClick={createDirector}
              >
                Add Director
              </Button>{" "}
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
                    setMode={setMode}
                    toggle={handleClose}
                    removeData={removeDirector}
                    rowData={setRowData}
                  />
                </Col>
              ))}
          </Row>
          <AddDirector
            mode={mode}
            open={modal}
            handleClose={handleClose}
            initial_data={rowData}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(Director);
