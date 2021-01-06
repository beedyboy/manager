import React, { useEffect, useState, useContext, Fragment } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import dataHero from "data-hero";
import moment from "moment";
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
import DirectorStore from "../../../../stores/DirectorStore"; 
const schema = {
  firstname: {
    isEmpty: false,
    min: 1,
    message: "Firstname is required",
  },
  lastname: {
    isEmpty: false,
    message: "Lastname is required",
  },
  position: {
    isEmpty: false,
    message: "Position is required",
  },
};

const dateFormat = "YYYY/MM/DD";
const AddDirector = ({ mode, open, handleClose, initial_data }) => {
  const dirStore = useContext(DirectorStore);
  const {
    createDirector,
    updateDirector,
    confirmDirector,
    sending,
    exist,
    close,
  } = dirStore;
  const [title, setTitle] = useState("Add Director");
  const [uploadImage, setUploadImage] = useState({
    touched: false,
    preview: "",
    file: "choose file",
  });
  const [formState, setFormState] = useState({
    values: {
      id: "",
      firstname: "",
      lastname: "",
      position: "",
      date_joined: "",
      story: "",
    },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Director");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data.id,
            date_joined: data && data.date_joined,
            firstname: data && data.firstname,
            lastname: data && data.lastname,
            position: data && data.position,
            story: data && data.story,
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
          date_joined: "",
          firstname: "",
          lastname: "",
          position: "",
          story: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid:
        errors.firstname.error ||
        errors.lastname.error ||
        errors.position.error ||
        uploadImage.toggle === false
          ? false
          : true,
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
    if (
      (event.target.name === "firstname" ||
        event.target.name === "position" ||
        event.target.name === "lastname") &&
      formState.values.lastname !== "" &&
      formState.values.firstname !== "" &&
      formState.values.position  !== ""
    ) {
      confirmDirector(
        formState.values.lastname,
        formState.values.position,
        formState.values.firstname
      );
    }
  };
  const onEditorStateChange = (e, editor) => {
    const data = editor.getData();
    setFormState((state) => ({
      ...formState,
      values: {
        ...formState.values,
        story: data,
      },
      touched: {
        ...formState.touched,
        story: true,
      },
    }));
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const readURI = (e) => {
    e.persist();
    let reader = new FileReader();
    let image = e.target.files[0];
    reader.onloadend = () => {
      setUploadImage((state) => ({
        ...state,
        touched: true,
        preview: reader.result,
        file: image,
      }));
    };
    reader.readAsDataURL(image);
  };

  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        date_joined: "",
        firstname: "",
        lastname: "",
        position: "",
        story: "",
      },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", uploadImage.file);
    fd.append("firstname", formState.values.firstname);
    fd.append("lastname", formState.values.lastname);
    fd.append("date_joined", formState.values.date_joined);
    fd.append("position", formState.values.position);
    fd.append("story", formState.values.story);
    mode === "Add" ? createDirector(fd) : updateDirector(formState.values);
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
                      <Label for="deptName">First Name</Label>
                      <Input
                        type="text"
                        value={formState.values.firstname || ""}
                        name="firstname"
                        onChange={handleChange}
                        placeholder="first Name"
                        invalid={hasError("firstname") || exist}
                      />
                      <FormFeedback>
                        {hasError("firstname")
                          ? formState.errors.firstname &&
                            formState.errors.firstname.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="deptName">Last Name</Label>
                      <Input
                        type="text"
                        value={formState.values.lastname || ""}
                        name="lastname"
                        onChange={handleChange}
                        placeholder="Last Name"
                        invalid={hasError("lastname") || exist}
                      />
                      <FormFeedback>
                        {hasError("lastname")
                          ? formState.errors.lastname &&
                            formState.errors.lastname.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="deptName">Position</Label>
                      <Input
                        type="text"
                        value={formState.values.position || ""}
                        name="position"
                        onChange={handleChange}
                        placeholder="Position"
                        invalid={hasError("position") || exist}
                      />
                      <FormFeedback>
                        {hasError("position")
                          ? formState.errors.position &&
                            formState.errors.position.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="deptName">Date Joined</Label>
                      <Input
                        type="date"
                        defaultValue={
                          formState.values.date_joined
                            ? moment(formState.values.date_joined, dateFormat)
                            : moment()
                        }
                        name="date_joined"
                        id="date_joined"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="image">Image</Label>
                      <Input
                        accept="image/*"
                        type="file"
                        name="image"
                        id="image"
                        onChange={readURI}
                      />
                      <FormFeedback>
                        {uploadImage.touched ? null : "Image is important"}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    {uploadImage.touched ? (
                      <img
                        src={uploadImage.preview}
                        alt="First"
                        style={{ width: "100%", height: 90 }}
                      />
                    ) : null}
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="story">Story</Label>

                      <CKEditor
                        editor={ClassicEditor}
                        data={formState.values.story}
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
              disabled={!formState.isValid || sending || exist}
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

export default observer(AddDirector);
