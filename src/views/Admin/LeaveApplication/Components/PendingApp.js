import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Row, Col } from "reactstrap";

const PendingApp = ({
  data,  
}) => {
  
  const columns = [
    {
      name: "Leave Type",
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
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          {/* {canModify ? (
            <Fragment>
              <Button
                size="sm"
                color="warning"
                onClick={(e) => editData(e, row)}
              >
                <i className="fa fa-edit"></i>
              </Button>{" "}
              <Link
                to={`/asset/${row.id}/view`}
                className="btn btn-info btn-sm"
              >
                View
              </Link>{" "}
            </Fragment>
          ) : (
            ""
          )} */}
          
          
        
        </div>
      ),
    },
  ];
   
  return (
    <Fragment>
      <Row>
         
        <Col md="12">
          <DataTable
            title="Pending Applications"
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

export default PendingApp;
