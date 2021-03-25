import React, { useEffect, useState, useContext, Fragment } from "react";
import dataHero from "data-hero";
import LeaveStore from "../../../stores/LeaveStore";
import {
  Button, 
  Card,
  CardBody,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Col,
} from "reactstrap"; 
import moment from "moment";
import { observer } from "mobx-react";  
const schema = { 
  leave_type_id: {
    isEmpty: false,
    min: 1,
    message: "Vacation type is required",
  },
  leave_start_date: {
    isEmpty: false,
    min: 1,
    message: "Start date is required",
  },
  leave_end_date: {
    isEmpty: false,
    message: "End date is required",
  },
};

const LeaveAppForm = ({ mode, open, handleClose, initial_data }) => {
  const dateFormat = "YYYY/MM/DD";
  const leaveStore = useContext(LeaveStore); 
  const { applyForLeave, updateLeave, sending, info, close, toggleClose } = leaveStore; 
  const [title, setTitle] = useState("Add Vacation");  
  const [formState, setFormState] = useState({
    values: {
      id: "",
      leave_type_id: "",  
      leave_start_date: moment().format(dateFormat),
      leave_end_date: moment().format(dateFormat),
      description: "",
    },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Vacation");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data; 
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data.id, 
            leave_type_id: data && data.leave_type_id, 
            leave_start_date: data && data.leave_start_date,
            leave_end_date: data && data.leave_end_date,  
            description: data && data.description,
          },
        })); 
      }
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
      leave_type_id: "",  
      leave_start_date: "",
      leave_end_date: "",
      description: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.leave_type_id.error || errors.leave_start_date.error || errors.leave_end_date.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
 

  useEffect(() => {
    if (close === true) {
      resetForm();
      handleClose();
    }
    return () => {
      toggleClose();
    };
  }, [close]);
  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    })); 
  };
   
 
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? applyForLeave(formState.values)
      : updateLeave(formState.values);
  };
  const resetForm = () => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        id: "",
      leave_type_id: "",  
      leave_start_date: "",
      leave_end_date: "",
      description: "",
      },
      touched: {
        ...formState.touched, 
        leave_type_id: false,
        leave_start_date: false,
        leave_end_date: false, 
        description: false 
      },
    }));
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
          {title}
        </ModalHeader>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ModalBody>
            <Card>
              <CardBody>
                <Row>
                

                  <Col md="12">
                    <FormGroup>
                      <Label for="leave_type_id">Vacation Type</Label>
                      <Input
                        type="select"
                        value={formState.values.leave_type_id || ""}
                        name="leave_type_id"
                        id="leave_type_id"
                        invalid={hasError("leave_type_id")}
                        onChange={handleChange}
                      >
                        <option value="">select</option>
                        {info &&
                          info.map((leave) => (
                            <option value={leave.id} key={leave.id}>
                              {leave.leave_type}
                            </option>
                          ))}
                      </Input>
                      <FormFeedback>
                        {hasError("leave_type_id")
                          ? formState.errors.leave_type_id &&
                            formState.errors.leave_type_id.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
  
                  <Col
                    md="12" 
                  >
                    <FormGroup>
                      <Label for="leave_start_date">Start Date</Label>
                      <Input
                        type="date"
                        // value={formState.values.leave_start_date || ""}
                        locale="fr"
                        defaultValue={
                          formState.values.start_date
                            ? moment(formState.values.leave_start_date, dateFormat)
                            : moment().format(dateFormat)
                        }
                        name="leave_start_date"
                        id="leave_start_date"
                        onChange={handleChange}
                        placeholder="Start Date"
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    md="12" 
                  >
                    <FormGroup>
                      <Label for="leave_end_date">End Date</Label>
                      <input
                        type="date"
                        // value={formState.values.leave_end_date || ""} 
                         locale="fr"
                        defaultValue={
                          formState.values.start_date
                            ? moment(formState.values.leave_end_date, dateFormat)
                            : moment().format(dateFormat)
                        }
                        name="leave_end_date"
                        id="leave_end_date"
                        onChange={handleChange}
                        placeholder="End Date"
                      />
                    </FormGroup>
                  </Col> 

                  <Col md="12">
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        type="textarea"
                        value={formState.values.description || ""}
                        name="description"
                        id="description"
                        onChange={handleChange}
                        placeholder="Enter description"
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
            <Button
              color="primary"
              disabled={!formState.isValid || sending}
              type="submit"
            >
              {sending ? (
                <span>
                  {" "}
                  Saving data <i className="fa fa-spinner"></i>
                </span>
              ) : (
                "Save changes"
              )}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </Fragment>
  );
};

export default observer(LeaveAppForm);
