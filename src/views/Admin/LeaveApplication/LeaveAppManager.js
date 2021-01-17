import React, { useContext, useState, useEffect, Fragment } from "react";
import { observer } from "mobx-react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import PendingApp from "./Components/PendingApp";
import AllAppList from "./Components/AllAppList";
import LeaveStore from "../../../stores/LeaveStore";
import ApprovedList from "./Components/ApprovedList";
import RejectedApp from "./Components/RejectedApp";

const LeaveAppManager = () => {
  const leaveStore = useContext(LeaveStore);
  const {
    applications,
    pendingApplications,
    approvedApplications,
    rejectedApplications,
    fetchApplications,
    removeLeaveApplication,
    deleting,
  } = leaveStore;
  const [activeTab, setActiveTab] = useState("all");
  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <h5>Vacation Application Management</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              <ButtonGroup className="border border-secondary rounded">
                <Button
                  color={activeTab === "all" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("all")}
                >
                  All
                </Button>
                <Button
                  color={activeTab === "pending" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("pending")}
                >
                  Pending
                </Button>
                <Button
                  color={activeTab === "approved" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("approved")}
                >
                  Approved
                </Button>
                <Button
                  color={activeTab === "rejected" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("rejected")}
                >
                  Rejected
                </Button>
              </ButtonGroup>
              <div className="card-block mt-2  border-right">
                <div className={activeTab === "all" ? "active" : "d-none"}>
                  <AllAppList
                    deleting={deleting}
                    data={applications}
                    removeData={removeLeaveApplication}
                  />
                </div>
                <div className={activeTab === "pending" ? "active" : "d-none"}>
                  <PendingApp
                    deleting={deleting}
                    data={pendingApplications}
                    removeData={removeLeaveApplication}
                  />
                </div>
                <div className={activeTab === "approved" ? "active" : "d-none"}>
                  <ApprovedList
                    deleting={deleting}
                    data={approvedApplications}
                    removeData={removeLeaveApplication}
                  />
                </div>
                <div className={activeTab === "rejected" ? "active" : "d-none"}>
                  <RejectedApp
                    deleting={deleting}
                    data={rejectedApplications}
                    removeData={removeLeaveApplication}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(LeaveAppManager);
