import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap"; 
import AddDocument from "./Components/AddDocument";
import DocumentList from "./Components/DocumentList"; 
import DocumentStore from "../../../stores/DocumentStore";

const Document = () => {
  const docStore = useContext(DocumentStore);
  const { info: documents, removeDocument, toggleClose } = docStore;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
    toggleClose();
  };
  const createDocument = () => {
    setModal(true);
    setMode("Add");
  };

 
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Document Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12">
                 <Button
                  color="secondary"
                  className="float-right"
                  onClick={createDocument}
                >
                  Add Document
                </Button> 
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2"> 
                <DocumentList 
                  data={documents}
                  setMode={setMode}
                  toggle={handleClose}
                  removeData={removeDocument}
                  rowData={setRowData}
                /> 
            </Col>
          </Row>
          <AddDocument
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

export default observer(Document);
