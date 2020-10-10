import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Form, FormGroup, Input, Button} from "reactstrap";

const Locations = (props) => {

    // console.log("Characters.js props.locationsURL", props.locationsURL);
    // console.log("Characters.js props.paginationURL", props.paginationURL);
    // console.log("Characters.js props.arrayCharacters", props.arrayCharacters);
    // console.log("Characters.js props.arrayEpisodes", props.arrayEpisodes);
    // console.log("Characters.js props.arraySearchLocationTypes", props.arraySearchLocationTypes);
    // console.log("Characters.js props.arraySearchDimensions", props.arraySearchDimensions);

    return (
        <React.Fragment>
            <Form id="frmSearch">
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
            </Form>
        </React.Fragment>
    );
};

export default Locations;