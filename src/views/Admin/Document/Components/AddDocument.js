import React, { useEffect, useState, useContext, Fragment } from "react";
import dataHero from "data-hero"; 
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
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { observer } from "mobx-react";
import DocumentStore from "../../../../stores/DocumentStore";
const schema = {
  title: {
    isEmpty: false,
    min: 1,
    message: "Title is required",
  },
  description: {
    min: 5,
    message: "Description is required",
  },
};
const AddDocument = ({ mode, open, handleClose, initial_data }) => {
  const docStore = useContext(DocumentStore);
  const { createDocument, updateDocument, sending, close } = docStore;
  const [title, setTitle] = useState("Add Document");
  const [formState, setFormState] = useState({
    values: { id: "", title: "", doc_type: "", description: "" },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Document");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data.id,
            title: data && data.title,
            doc_type: data && data.doc_type,
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
          title: "",
          doc_type: "",
          description: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.title.error || errors.description.error ? false : true,
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
  const onEditorStateChange = (e, editor) => {
    const data = editor.getData();
    setFormState((state) => ({
      ...formState,
      values: {
        ...formState.values,
        description: data,
      },
      touched: {
        ...formState.touched,
        description: true,
      },
    }));
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? createDocument(formState.values)
      : updateDocument(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        title: "",
        doc_type: "",
        description: "",
      },
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
                      <Label for="title">Document Name</Label>
                      <Input
                        type="text"
                        value={formState.values.title || ""}
                        name="title"
                        onChange={handleChange}
                        placeholder="Document Name"
                        invalid={hasError("title")}
                      />
                      <FormFeedback>
                        {hasError("title")
                          ? "Name field must be a minimum of 2 characters"
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="doc_type">Document Type</Label>
                      <Input
                        type="text"
                        value={formState.values.doc_type || ""}
                        name="doc_type"
                        id="doc_type"
                        onChange={handleChange}
                        placeholder="Document Type"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup
                      className={hasError("description") ? "has-danger" : null}
                    >
                      <Label for="description">Description</Label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={formState.values.description}
                        onChange={onEditorStateChange}
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

export default observer(AddDocument);
