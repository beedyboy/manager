import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react";
import {
  Card,
  CardBody, 
  CardHeader,
  Button,
  Row,
  Col, 
} from "reactstrap";  
import MarketStore from "../../stores/MarketStore";
import MarketList from "./MarketList";
import MarketForm from "./MarketForm";
const Market = () => {
    const markStore = useContext(MarketStore);
    const { info: markets, removeMarket } = markStore;
    const [mode, setMode] = useState("");
    const [rowData, setRowData] = useState();
    const [modal, setModal] = useState(false);
    const handleClose = () => {
      setModal(!modal);
    };
    const createMarket = () => {
      setModal(true);
      setMode("Add");
    };
    return (
        <Fragment>
             <Card className="mt-2">
        
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Marketing Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12"> 
                <Button
                  color="secondary"
                  className="float-right"
                  onClick={createMarket}
                >
                  Add Link
                </Button> 
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2"> 
                <MarketList
                data={markets}
                  setMode={setMode}
                  toggle={handleClose}
                  removeData={removeMarket}
                  rowData={setRowData}
                /> 
            </Col>
          </Row>
          <MarketForm
            mode={mode}
            open={modal}
            handleClose={handleClose}
            initial_data={rowData}
          />
        </CardBody>
      </Card>
        </Fragment>
    )
}

export default observer(Market);
