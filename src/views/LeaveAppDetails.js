import React, { useEffect, useContext, Fragment, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Badge, Card, CardBody, Button, Table, Row, Col } from "reactstrap"; 
import { observer } from "mobx-react";
import Utility from "../services/UtilityService";
import LeaveStore from "../stores/LeaveStore";
import LeaveStatus from "./Admin/LeaveApplication/Components/Status";

let canModify = Utility.canAccess("leave", "add");
const LeaveAppDetails = (props) => {
  const leaveStore = useContext(LeaveStore);
  const {
    getApplicationById,
    application,
    sending,
    close, 
    toggleClose,
    toggleStatus,
  } = leaveStore;
  const [modal, setModal] = useState(false); 
  const [user, setUser] = useState('staff'); 
  const handleClose = () => {
    setModal(!modal);
  }; 
  useEffect(() => {
    let id = parseInt(props.match.params.id);
    setUser(props.match.params.user);
    getApplicationById(id);
  }, [props]);
  return (
    <Fragment>
      <Row>
        <Col md="8" className="border-right">
          <Card className="mt-2">
            <CardBody>
              <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                Leave Details
              </h6>
              <Table responsive>
               <tbody>
               <tr>
                  <td>
                    {" "}
                    <p className="m-b-10 f-w-600">Employe Name</p>
                  </td>
                  <td>
                    {" "}
                    <h6 className="text-muted f-w-400">
                      {" "}
                      {application && application.firstname}{" "}
                      {application && application.lastname}
                    </h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="m-b-10 f-w-600">Leave Type</p>
                  </td>
                  <td>
                    {" "}
                    <h6 className="text-muted f-w-400">
                      {application && application.leave_type}
                    </h6>{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <p className="m-b-10 f-w-600">Start Date</p>
                  </td>
                  <td>
                    {" "}
                    <h6 className="text-muted f-w-400">
                      {application && application.leave_start_date}
                    </h6>{" "}
                  </td>
                  <td>
                    <p className="m-b-10 f-w-600">End Date</p>
                  </td>
                  <td>
                    {" "}
                    <h6 className="text-muted f-w-400">
                      {application && application.leave_end_date}
                    </h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="m-b-10 f-w-600">Employe Leave Description</p>
                  </td>
                  <td>{ReactHtmlParser(application.description)}</td>
                </tr>
                <tr>
                  <td>
                  <p className="m-b-10 f-w-600">leave Status :</p>
                  </td>
                  <td colSpan="5">
                    {" "}
                    <Badge>{application && application.status}</Badge>
                    <LeaveStatus
                        open={modal}
                        handleClose={handleClose}
                        sending={sending}
                        data={application.status}
                        id={application.id}
                        close={close}
                        toggleStatus={toggleStatus}
                        toggleClose={toggleClose}
                      />
                  </td>
                </tr>

                <tr>
                  <td>
                  <p className="m-b-10 f-w-600">Admin Remark: </p>
                  </td>
                  <td colSpan="5">
                  <h6 className="text-muted f-w-400">
                    {application && application.admin_remark === ""
                      ? "NA"
                      : application.admin_remark}
                      </h6>
                  </td>
                </tr>

               {user === 'admin'? ( <tr>
                  <td>
                  <p className="m-b-10 f-w-600">Take Action </p>
                  </td>
                  <td colSpan="5">
                  <h6 className="text-muted f-w-400">
                        {" "}
                        {canModify ? (
                          <Button
                            size="sm"
                            color="warning"
                            onClick={handleClose}
                          >
                            <i className="fa fa-edit"></i>
                          </Button>
                        ) : null}
                      </h6>
                  </td>
                </tr>
               ) : null }
               </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Row>
            <Col md="12">
              <Card className="mt-2">
                <CardBody>
                  <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                    Leave Information
                   
                  </h6>

                  <Row>
                    
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Leave Type</p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {application && application.leave_type}
                      </h6>
                    </Col>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Allowed Days</p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {application && application.allowed_days}
                      </h6>
                    </Col>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Created On</p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {application && application.created_at}
                      </h6>
                    </Col>
 
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(LeaveAppDetails);
