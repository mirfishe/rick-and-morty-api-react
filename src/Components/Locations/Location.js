import React, {useState, useEffect} from "react";
import {Container, Col, Row, Card, CardBody, CardLink} from "reactstrap";

const Location = (props) => {

    // console.log("Location.js props.results", props.results);

    return (
        <React.Fragment>

            {props.results.length > 0 ? props.results.map((location) => {
                        // console.log("Location.js results.map location", location);
                    return (

                        <Card key={location.id} className="m-2 p-2">
                        <CardBody>
                            <p><CardLink href={location.url} onClick={props.loadDetailsModal}>{location.name}</CardLink></p>
                            <p>Dimension: <CardLink href={location.dimension} onClick={props.loadDetailsModal}>{location.dimension}</CardLink></p>
                            <p>Type: <CardLink href={location.type} onClick={props.loadDetailsModal}>{location.type}</CardLink></p>
                            <p>Resident(s): 
                            {/* {location.residents.map((resident, index) => {
                                console.log("Location.js residents.map resident", resident);
                                return ({index})
                                })} */}
                                {location.residentsList}
                            </p>
                            <p>All Resident(s): </p>
                        </CardBody>
                        </Card>
                    )
                })
                    : null}

            
        </React.Fragment>
    );
};

export default Location;
