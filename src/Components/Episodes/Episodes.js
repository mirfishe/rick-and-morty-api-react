import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Form, FormGroup, Input, Button} from "reactstrap";

const Episodes = (props) => {

    // console.log("Characters.js props.episodesURL", props.episodesURL);
    // console.log("Characters.js props.paginationURL", props.paginationURL);
    // console.log("Characters.js props.arrayCharacters", props.arrayCharacters);
    // console.log("Characters.js props.arrayLocations", props.arrayLocations);

    return (
        <React.Fragment>
            <Form id="frmSearch">
                <FormGroup>
                <Input type="text" id="txtSearchEpisodeName" placeholder="Name" />
                </FormGroup>
                <FormGroup>
                <Input type="text" id="txtEpisode" placeholder="Episode" />
                </FormGroup>
                <FormGroup>
                    <Button id="btnSearchEpisodes" color="primary" size="lg">Search Episodes</Button>
                </FormGroup>
            </Form>
        </React.Fragment>
    );
};

export default Episodes;