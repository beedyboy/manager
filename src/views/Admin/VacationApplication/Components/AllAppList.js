import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const AllAppList = ({ data }) => {
  const columns = [
    {
      name: "Name",
      sortable: true,
      cell: (row) => (
        <Fragment>
          <Link to={`/staff/${row.id}/view`} className="text-info">
            {row.firstname + " " + row.lastname}
          </Link>
        </Fragment>
      ),
    },
    {
      name: "Vacation Type",
      selector: "leave_type",
      sortable: true,
    },
    {
      name: "Start date",
      selector: "leave_start_date",
      sortable: true,
    },
    {
      name: "End date",
      selector: "leave_end_date",
      sortable: true,
    },
    {
      name: "Days",
      selector: "days",
      sortable: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          <Link
            to={`/vacation-applications/${row.id}/${row.staff_id}/${row.leave_type_id}/admin`}
            className="btn btn-info btn-sm"
          >
            View
          </Link>{" "}
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Row>
        <Col md="12">
          <DataTable
            title="Application List"
            columns={columns}
            data={data}
            pagination={true}
            theme="solarized"
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default AllAppList;
