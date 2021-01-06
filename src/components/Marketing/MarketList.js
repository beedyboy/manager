import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "reactstrap";
 
 
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' } ];
const MarketList = ({
  data,
  setMode,
  removeData,
  rowData,
  toggle}) => {   

  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle(true);
  };
  const deleteData = (e, id) => {
    removeData(id);
  };
  
const columns = [
  {
    name: 'URL Link',
    selector: 'url_link',
    sortable: true,
  },
  {
    name: "Description",
    selector: "description",
    wrap: true,
    sortable: true,
  },
  {
    name: 'Created',
    selector: 'created_at',
    sortable: true
  }, 
  {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
    <Button size="sm" color="warning" onClick={e => editData(e, row)}>
      <i className="fa fa-edit"></i>
      </Button>{' '}
    <Button size="sm" color="danger" 
    onClick={(e) =>{ if(window.confirm('Delete this url link?')){deleteData( e, row.id)};}}>
      <i className="fa fa-trash"></i>
      </Button>  
     </div>
  },
]; 
 
  
    return (
      <Fragment>
        <Row>
        
          <Col md="12" className="m-t-2">
             <DataTable
              title="Marketing Links"
              columns={columns}
              data={data}
              pagination={true} 
              theme="solarized"
             />
    
          </Col>
        </Row> 
      </Fragment>
    
    )
}


export default MarketList;