import React, { Fragment, useContext, useState, useEffect } from "react";
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
import { observer } from "mobx-react";
import dataHero from "data-hero";
import MarketStore from "../../stores/MarketStore";

const schema = {
  url_link: {
    isEmpty: false,
    min: 1,
    message: "marketing url link is required",
  },
};

const MarketForm = ({  mode, open, handleClose, initial_data }) => {
  const markStore = useContext(MarketStore);
  const { createMarket, updateMarket, sending, close } = markStore;
  const [title, setTitle] = useState("Add Link");
  const [formState, setFormState] = useState({
    values: { id: "", description: "", url_link: "" },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Link");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data.id,
            url_link: data && data.url_link,
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
          description: "",
          url_link: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.url_link.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
  useEffect(() => {
    if (close === true) {
      resetForm();
      handleClose();
    }
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
      ? createMarket(formState.values)
      : updateMarket(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, id: "", url_link: "", description: "" },
      touched: {},
      errors: {},
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
                      <Label for="url">URL Link</Label>
                      <Input
                        type="text"
                        value={formState.values.url_link || ""}
                        name="url_link"
                        id="url_link"
                        onChange={handleChange}
                        placeholder="Enter url"
                        invalid={hasError("url_link")}
                      />
                      <FormFeedback>
                        {hasError("url_link") ? formState.errors.url_link.message : null}
                      </FormFeedback>
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
export default observer(MarketForm);
