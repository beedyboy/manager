import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Badge, Card, CardBody, CardTitle, CardImg } from "reactstrap";

const DirectorList = ({ data}) => {
  
  return (
    <Fragment>
       <Card>                     
               <CardBody className="lt-cardBody">
                   <div className="flip-card">
                   <div className="flip-content">
                <div className="flip-front">
               
                    <CardImg top width="100%" style={{height: '280px', maxHeight: '280px', width: '100%'}} src={data.images}
                alt={data.id} />  

                </div> 
                <div className="flip-back">  
                    
                    <div className="card-text">
                      
                    <PerfectScrollbar>
                    <> 
                    {ReactHtmlParser(data && data.story)}
                    </> 
                    </PerfectScrollbar>
                        
                    </div>  
                </div>
               </div>
                   </div>
                   {/* {other stuff here} */}
                   <CardTitle style={{paddingLeft: '30px', color: 'black'}}>
                       {data.lastname + " " + data.firstname}
                       <br />
                     <span style={{paddingLeft: '25px'}}>
                     <Badge color="warning">{data.position || "not available"}</Badge> </span>
                     <br />
                     <span style={{paddingLeft: '10px'}}>
                       <Badge color="info">Joined:  {data.date_joined || "not available"}</Badge> </span>
                     
                       </CardTitle>
               </CardBody>
                </Card>
     
    </Fragment>
  );
};

export default DirectorList;
