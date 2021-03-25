import React, {Fragment} from 'react'; 
import DataTable from "react-data-table-component";
import { Row, Col } from "reactstrap"; 

const VacationHistory = ({data}) => { 
  const columns = [
    {
      name: "Name",
      sortable: true,
      cell: (row) => (
        <Fragment>
             {row.firstname + " " + row.lastname} 
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
    
  ];


    return (
        <Fragment>
      <Row> 
        <Col md="12">
          <DataTable
            title="Application History"
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
 

export default VacationHistory;
