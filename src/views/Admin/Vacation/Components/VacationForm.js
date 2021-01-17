import React, { useEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero';
import LeaveStore from '../../../../stores/LeaveStore';
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';

const VacationForm = ({mode, open, handleClose, initial_data}) => {
  const store = useContext(LeaveStore);
  const { createLeave, updateLeave, close, sending, exist, confirmLeaveType } = store; 
  const [hasError, setHasError]  = useState(false);
  const [title, setTitle]  = useState('Add Vacation');
    const [formState, setFormState] = useState({ 
        id: '', leave_type: '', allowed_days: '',  description: ''
      });
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Vacation');
      let shouldSetData =  typeof initial_data !== 'undefined' ? true : false; 
    if (shouldSetData) {  
    const data = initial_data; 
    setFormState(state => ({
      ...state, 
      id: data && data.id,
      leave_type: data && data.leave_type, 
      allowed_days: data && data.allowed_days, 
      description: data && data.description  
    })); 
    }
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
        id: '', leave_type: '', allowed_days: '',  description: ''
      }))
    }
  }, [initial_data, mode]);
  useEffect(() => {
    if(close === true) {
     resetForm();
     handleClose(); 
    } 
  }, [close]) 
  useEffect(() => { 
    const error = dataHero.validator(formState.leave_type, 'min', 2);
    setHasError(error); 
    setFormState(formState => ({
      ...formState,
      isValid: !error,
      errors: error?  'Vacation type field must be a minimum of 2 characters': null
    })); 
  }, [formState.leave_type]);  
  const handleChange = event => { 
    event.persist(); 
    setFormState(formState => ({
      ...formState,  
      [event.target.name]:  event.target.value 
    })); 
    if(event.target.name === 'leave_type' && event.target.value.length >= 2) {
      confirmLeaveType(event.target.value);
    }
  }
  const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createLeave(formState) : updateLeave(formState);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      id: '', leave_type: '', allowed_days: '',  description: ''
    }))
  }
  const closeBtn = <Button className="close" onClick={handleClose}>&times;</Button>;
    return (
        <Fragment>
        <Modal isOpen={open} toggle={handleClose}>
            <ModalHeader toggle={handleClose} close={closeBtn}>{title}</ModalHeader>
         <form noValidate autoComplete="off"  onSubmit={handleSubmit}>
      
    <ModalBody>
    <Card>
      <CardBody> 
          <Row>
              <Col md="12"> 
                <FormGroup>
                  <Label for="leave_type">Vacation Type</Label>
                  <Input
                  type="text" 
                  value={formState.leave_type || ''}
                  name="leave_type"
                  id="leave_type"
                  onChange={handleChange} 
                  placeholder="Leave Type" 
                  invalid={hasError || exist}
                  />
                   <FormFeedback>  
                        { hasError ? 'Vacation type field must be a minimum of 2 characters' : null } 
                        <p> { exist ? 'Vacation type already exists' : null}</p>
                    </FormFeedback>
                 </FormGroup>  
              </Col>

              <Col md="12"> 
                <FormGroup>
                  <Label for="allowed_days">Allowed days</Label>
                  <Input
                  type="number" 
                  value={formState.allowed_days || ''}
                  name="allowed_days"
                  id="allowed_days"
                  onChange={handleChange} 
                  placeholder="Allowed days"  
                  />
                   
                 </FormGroup>  
              </Col>

              <Col md="12"> 
                <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                        type="textarea" 
                        value={formState.description || ''}
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
        </Button> {" "}
        <Button color="primary" disabled={!formState.isValid || sending || exist}  type="submit">
        {sending ? (
            <span> Saving data  <i className="fa fa-spinner"></i></span>
            ): 'Save changes'}
        </Button>
    </ModalFooter>
      </form>
</Modal>
          
     
              
    </Fragment >
    )
}

export default observer(VacationForm)
