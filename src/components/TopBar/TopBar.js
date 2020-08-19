import React, { Fragment, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav, 
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  Container
} from 'reactstrap';
import Utility from '../../services/UtilityService';

 const TopBar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    return (
        <Fragment>
            <div className="logos">Inventory</div>
                    <ul>
                        <li><i className="fa fa-search"></i></li>
                         <li><i className="fa fa-user"></i></li>
                        <li onClick={e => Utility.logout()}><i className="fa fa-sign-out"></i></li> 
                    </ul>
          {/* <Navbar className="topbar" expand="md">
          <Container fluid={true}>
        <NavbarBrand href="/">Inventory APP</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
           
             
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {Utility.get('name')}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Profile
                </DropdownItem> 
                <DropdownItem divider />
                <DropdownItem >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          
        </Collapse>
        </Container>
      </Navbar>  */}
        </Fragment>
    )
}
export default TopBar