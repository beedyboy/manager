import React, { useState, Fragment } from "react";
import { Card, CardBody, ButtonGroup, Button, Row, Col } from "reactstrap";
import Market from "../../components/Marketing/Market";
import Branch from "./Branch/Branch";
import Category from "./Category/Category";
import Company from "./Company/Company";
import Department from "./Department/Department";
import Director from "./Director/Director";
import Document from "./Document/Document";
import Leave from "./Vacation/Vacation";
import SubCategory from "./SubCategory/SubCategory";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("company");
  return (
    <Fragment>
      <Card className="mt-2">
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              <ButtonGroup className="border border-secondary rounded">
                <Button
                  color={activeTab === "branch" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("branch")}
                >
                  Branch
                </Button>
                <Button
                  color={activeTab === "category" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("category")}
                >
                  Category
                </Button>
                <Button
                  color={activeTab === "company" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("company")}
                >
                  Company
                </Button>
                <Button
                  color={activeTab === "department" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("department")}
                >
                  Department
                </Button>
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
                <Button
                  color={activeTab === "leave" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("leave")}
                >
                  Leave
                </Button>
                <Button
                  color={activeTab === "marketing" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("marketing")}
                >
                  Marketing
                </Button>
                <Button
                  color={activeTab === "sub-cat" ? "primary" : "dark"}
                  onClick={(e) => setActiveTab("sub-cat")}
                >
                  Sub Category
                </Button>
              </ButtonGroup>
              <div className="card-block mt-2  border-right">
                <div className={activeTab === "branch" ? "active" : "d-none"}>
                  <Branch />
                </div>
                <div className={activeTab === "category" ? "active" : "d-none"}>
                  <Category />
                </div>
                <div className={activeTab === "company" ? "active" : "d-none"}>
                  <Company />
                </div>
                <div
                  className={activeTab === "department" ? "active" : "d-none"}
                >
                  <Department />
                </div>

                <div className={activeTab === "director" ? "active" : "d-none"}>
                  <Director />
                </div>

                <div className={activeTab === "document" ? "active" : "d-none"}>
                  <Document />
                </div>
                <div className={activeTab === "leave" ? "active" : "d-none"}>
                  <Leave />
                </div>
                <div
                  className={activeTab === "marketing" ? "active" : "d-none"}
                >
                  <Market />
                </div>
                <div className={activeTab === "sub-cat" ? "active" : "d-none"}>
                  <SubCategory />
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Admin;
