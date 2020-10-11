import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Row, FormGroup, Input, Button, Alert} from "reactstrap";
import Episode from "./Episode"

const Episodes = (props) => {

    // console.log("Episodes.js props.url", props.url);
    // console.log("Episodes.js props.paginationURL", props.paginationURL);
    // console.log("Episodes.js props.arrayCharacters", props.arrayCharacters);
    // console.log("Episodes.js props.arrayLocations", props.arrayLocations);

    // Build lookup arrays
    const [arrayCharacters, setArrayCharacters] = useState([]);
    const [arrayLocations, setArrayLocations] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [errMessage, setErrMessage] = useState("");
    const [txtSearchEpisodeName, setTxtSearchEpisodeName] = useState("");
    const [txtEpisode, setTxtEpisode] = useState("");

    useEffect(() => {
        // console.log("Locations.js useEffect props.arrayCharacters", props.arrayCharacters);
        setArrayCharacters(props.arrayCharacters);
    }, [props.arrayCharacters]);

    useEffect(() => {
        // console.log("Characters.js useEffect props.arrayLocations", props.arrayLocations);
        setArrayLocations(props.arrayLocations);
    }, [props.arrayLocations]);

    const searchEpisodes = () => {

        let URL = props.url;
        let searchString = "";
      
        if (txtSearchEpisodeName !== undefined) {
            if (txtSearchEpisodeName.length > 0) {
                searchString += "&name=" + txtSearchEpisodeName.replace(" ", "%20");
            };
        };
      
        if (txtEpisode !== undefined) {
            if (txtEpisode.length > 0) {
                searchString += "&episode=" + txtEpisode.replace(" ", "%20");
            };
        };
      
        if (searchString !== "") {
            console.log("Episodes.js searchLocations searchString", searchString);
            URL += "?" + searchString;
        };
      
        // console.log(URL);
      
        fetch(URL)
        .then(response => {
            console.log("Episodes.js searchLocations response", response);
            if (!response.ok) {
                // throw Error(response.status + " " + response.statusText + " " + response.url);
                return response.json();
            } else {
                // if (response.status === 200) {
                    return response.json();
                // } else {
                //     return response.status;
                // };
            };
        })
        .then(data => {
            console.log(data);
            // displayEpisodes(data);
            setErrMessage(data.error);
        })
        .catch(err => {
            console.log("Episodes.js getEpisodes err", err);
            setErrMessage(err);
        });

    };

    return (
        <React.Fragment>
                {errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : ""}
                <Row className="m-2">
                    <FormGroup className="m-2">
                    <Input type="text" id="txtSearchEpisodeName" placeholder="Name" onChange={(event) => {/*console.log(event.target.value);*/ setTxtSearchEpisodeName(event.target.value);}} />
                    </FormGroup>
                    <FormGroup className="m-2">
                    <Input type="text" id="txtEpisode" placeholder="Episode" onChange={(event) => {/*console.log(event.target.value);*/ setTxtEpisode(event.target.value);}} />
                    </FormGroup>
                </Row>
                <Row className="m-2">
                <FormGroup className="m-2">
                    <Button id="btnSearchEpisodes" color="primary" size="lg" className="ml-4 m-2 p-2" onClick={searchEpisodes}>Search Episodes</Button>
                </FormGroup>
                </Row>
        </React.Fragment>
    );
};

export default Episodes;