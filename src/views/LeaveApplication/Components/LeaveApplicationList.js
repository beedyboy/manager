import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "reactstrap";
import { Link } from "../../Admin/VacationApplication/Components/node_modules/react-router-dom";

const LeaveApplicationList = ({
  data, 
  setMode,
  removeData,
  rowData, 
  toggle, 
}) => { 
  const columns = [
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
    name: "Status",
    selector: "status",
    sortable: true,
  }, 
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          
             {row.status === 'Pending'? (
                <Fragment>
                   <Button
                 size="sm"
                 color="warning"
                 onClick={(e) => editData(e, row)}
               >
                 <i className="fa fa-edit"></i>
               </Button>{" "}
                </Fragment>
             ): ''}
              <Link
                to={`/vacation-applications/${row.id}/staff`}
                className="btn btn-info btn-sm"
              >
                View
              </Link>{" "}
            
          
            <Button
              size="sm"
              color="danger"
              onClick={(e) => {
                if (window.confirm("Delete the item?")) {
                  deleteData(e, row.id);
                }
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
        
        </div>
      ),
    },
  ];
  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle(true);
  };
  const deleteData = (id) => {
    removeData(id);
  };
  return (
    <Fragment>
      <Row>
  
        <Col md="12">
          <DataTable
            title="My Applications"
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

export default LeaveApplicationList;
