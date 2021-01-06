import React, { useContext, useState, useEffect, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap"; 
import LeaveAppForm from "./Components/LeaveAppForm";
import LeaveApplicationList from "./Components/LeaveApplicationList"; 
import LeaveStore from "../../stores/LeaveStore";

const LeaveApplication = () => {
  const leaveStore = useContext(LeaveStore);
  const { myApplications, getMyApplications, removeLeaveApplication, deleting } = leaveStore;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    getMyApplications(); 
  }, [])
  const handleClose = () => {
    setModal(!modal);
  };
  const newLeaveRequest = () => {
    setModal(true);
    setMode("Add");
  };
 
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          {/* <h5>Leave Application Management</h5> */}
          <Row>
           <Col md="5" sm="12">
             <h5>My Leave Applications</h5> 
           </Col>
           <Col md={{ size: 3, offset: 4 }} sm="12"> 
        <Button color="secondary" className='float-right' onClick={newLeaveRequest}
          >Request New</Button> 
           </Col>
           </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2"> 
                <LeaveApplicationList 
                  deleting={deleting}
                  newLeaveRequest={newLeaveRequest}
                  data={myApplications}
                  setMode={setMode}
                  toggle={handleClose}
                  removeData={removeLeaveApplication}
                  rowData={setRowData}
                /> 
            </Col>
          </Row>
          <LeaveAppForm
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

export default observer(LeaveApplication);
