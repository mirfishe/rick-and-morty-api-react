import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Form, FormGroup, Input, Button} from "reactstrap";

const Locations = (props) => {

    // console.log("Locations.js props.locationsURL", props.locationsURL);
    // console.log("Locations.js props.paginationURL", props.paginationURL);
    // console.log("Locations.js props.arrayCharacters", props.arrayCharacters);
    // console.log("Locations.js props.arrayEpisodes", props.arrayEpisodes);
    // console.log("Locations.js props.arraySearchLocationTypes", props.arraySearchLocationTypes);
    // console.log("Locations.js props.arraySearchDimensions", props.arraySearchDimensions);

    return (
        <React.Fragment>
                <FormGroup>
                <Input type="text" id="txtSearchLocationName" placeholder="Name" />
                </FormGroup>
                <FormGroup>
                <Input type="select" id="ddSearchLocationType">
                    <option value="">Select Type</option>
                </Input>
                </FormGroup>
                <FormGroup>
                <Input type="select" id="ddSearchDimension">
                    <option value="">Select Dimension</option>
                </Input>
                </FormGroup>
                <FormGroup>
                    <Button id="btnSearchLocations" color="primary" size="lg">Search Locations</Button>
                </FormGroup>
        </React.Fragment>
    );
};

export default Locations;