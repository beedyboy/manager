import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import Select from "react-select";
const LeaveStatus = ({
  data,
  id,
  sending,
  toggleStatus,
  toggleClose,
  open,
  close,
  handleClose,
}) => {
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const options = [
    { value: "Pending", label: "Pending" },
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
  ];
  useEffect(() => {
    setStatus(data);
  }, [data]);

  useEffect(() => {
    if (close === true) {
      handleClose();
    }
    return () => {
      toggleClose();
    };
  }, [close]);
  const handleChange = (e) => {
    setStatus(e.value);
  };
  const handleRemark = (e) => {
    setRemark(e.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const placeholder = {
      admin_remark: remark,
      status,
      id,
    };
    toggleStatus(placeholder);
  };
  const closeBtn = (
    <Button className="close" onClick={handleClose}>
      &times;
    </Button>
  );

  return (
    <Fragment>
      <Modal isOpen={open} toggle={handleClose}>
        <ModalHeader toggle={handleClose} close={closeBtn}>
          Update Status
        </ModalHeader>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ModalBody>
            <Card>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label for="status">Status</Label>
                      <Select
                        placeholder="Select Option"
                        name="status"
                        value={
                          options.filter((obj) => obj.value === status) || ""
                        }
                        onChange={handleChange}
                        options={options}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label for="remark">Remark</Label>
                      <Input
                        type="textarea"
                        value={remark || ""}
                        name="remark"
                        id="remark"
                        onChange={handleRemark}
                        placeholder="Admin Remark"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              Close
            </Button>{" "}
            <Button color="primary" disabled={sending} type="submit">
              {sending ? (
                <span>
                  {" "}
                  Saving status <i className="fa fa-spinner"></i>
                </span>
              ) : (
                "Save status"
              )}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </Fragment>
  );
};

export default LeaveStatus;
