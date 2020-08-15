import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import './styles.css';


const MainLayout = props => {
    const { children } = props; 
    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col xs={2} lg="2" id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} lg="10" id="page-content-wrapper" className="p-0 m-0">
                        <TopBar />
                        <Row>
                        
                            <Col md="12">
                                 
                            <main>{children}</main>
                            </Col>
                        </Row>
                       
                     
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}



export default MainLayout
