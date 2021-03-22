import React, { useState, useContext, useEffect } from "react";
import { Document, Page } from "react-pdf";
import {
  Container,
  FormGroup,
  Label,
  FormFeedback,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import { observer } from "mobx-react";
import dataHero from "data-hero";
import UserStore from "../../../stores/UserStore";
import { useAlert } from "react-alert";
const schema = {
  signature: {
    isEmpty: false,
    min: 1,
    message: "Signature is required",
  },
};

const CEO_STORY = (props) => {
  const alert = useAlert();
  const store = useContext(UserStore);
  const { signStory, sending, action, errMessage, message, error } = store;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  const { pdf, id } = props;
  const [formState, setFormState] = useState({
    values: {
      id: id,
      signature: "",
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.signature.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    if (action === "signed") {
      if (message) {
        alert.success(message);
      }
    }
    if (error) {
      alert.error(errMessage);
    }
  }, [action]);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    signStory(formState.values);
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  return (
    <>
      <Container className="rounded bg-white">
        <Row>
          <Col md="12">
            <Document
              file={pdf}
              options={{ workerSrc: "/pdf.worker.js" }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div>
              <p>
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </p>
              <Button
                type="button"
                color="info"
                disabled={pageNumber <= 1}
                onClick={previousPage}
              >
                Previous
              </Button>
              <Button
                type="button"
                color="primary"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
              >
                Next
              </Button>
            </div>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="signature">Sign Here</Label>
              <Input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="signature"
                value={formState.values.signature}
                onChange={handleChange}
                invalid={hasError("signature")}
              />
              <FormFeedback>
                {hasError("signature")
                  ? formState.errors.signature &&
                    formState.errors.signature.message
                  : null}
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <div className="mt-5 text-right">
          <Button
            color="primary"
            className="profile-button"
            type="button"
            disabled={!formState.isValid || sending}
            onClick={handleSubmit}
          >
            {sending ? (
              <span>
                {" "}
                Saving Changes <i className="fa fa-spinner"></i>
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </Container>
    </>
  );
};
export default observer(CEO_STORY);
