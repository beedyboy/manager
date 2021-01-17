import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap"; 
import VacationForm from "./Components/VacationForm";
import LeaveList from "./Components/LeaveList";
import Utility from "../../../services/UtilityService";
import LeaveStore from "../../../stores/LeaveStore";

const Vacation = () => {
  const store = useContext(LeaveStore);
  const { info: leaves, removeLeave } = store;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const createLeave = () => {
    setModal(true);
    setMode("Add");
  };
  let canAdd = Utility.canAccess("leave", "add");
  let canDel = Utility.canAccess("leave", "del");
  let canView = Utility.canAccess("leave", "view");
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Vacation Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12">
              {canAdd ? (
                <Button
                  color="secondary"
                  className="float-right"
                  onClick={createLeave}
                >
                  Add Vacation
                </Button>
              ) : null}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              {canView ? (
                <LeaveList
                  canAdd={canAdd}
                  canDel={canDel}
                  data={leaves}
                  setMode={setMode}
                  toggle={handleClose}
                  removeData={removeLeave}
                  rowData={setRowData}
                />
              ) : (
                "You do not have access to view"
              )}
            </Col>
          </Row>
          <VacationForm
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

export default observer(Vacation);
