import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Row, FormGroup, Input, Button, Alert} from "reactstrap";
import Location from "./Location"

const Locations = (props) => {

    // console.log("Locations.js props.url", props.url);
    // console.log("Locations.js props.paginationURL", props.paginationURL);
    // console.log("Locations.js props.arrayCharacters", props.arrayCharacters);
    // console.log("Locations.js props.arrayEpisodes", props.arrayEpisodes);
    // console.log("Locations.js props.arraySearchLocationTypes", props.arraySearchLocationTypes);
    // console.log("Locations.js props.arraySearchDimensions", props.arraySearchDimensions);

    // Build lookup arrays
    const [arrayCharacters, setArrayCharacters] = useState([]);
    const [arrayEpisodes, setArrayEpisodes] = useState([]);
    const [arraySearchLocationTypes, setArraySearchLocationTypes] = useState([]);
    const [arraySearchDimensions, setArraySearchDimensions] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [errMessage, setErrMessage] = useState("");
    const [txtSearchLocationName, setTxtSearchLocationName] = useState("");
    const [ddSearchLocationType, setDdSearchLocationType] = useState("");
    const [ddSearchDimension, setDdSearchDimension] = useState("");

    useEffect(() => {
        // console.log("Locations.js useEffect props.arrayCharacters", props.arrayCharacters);
        setArrayCharacters(props.arrayCharacters);
    }, [props.arrayCharacters]);

    useEffect(() => {
        // console.log("Locations.js useEffect props.arrayEpisodes", props.arrayEpisodes);
        setArrayEpisodes(props.arrayEpisodes);
    }, [props.arrayEpisodes]);

    useEffect(() => {
        // console.log("Locations.js useEffect props.arraySearchLocationTypes", props.arraySearchLocationTypes);
        setArraySearchLocationTypes(props.arraySearchLocationTypes);
        // buildSearchSpeciesLookup();
    }, [props.arraySearchLocationTypes]);

    useEffect(() => {
        // console.log("Locations.js useEffect props.arraySearchDimensions", props.arraySearchDimensions);
        setArraySearchDimensions(props.arraySearchDimensions);
    }, [props.arraySearchDimensions]);

    const searchLocations = () => {

        let URL = props.url;
        let searchString = "";
      
        if (txtSearchLocationName !== undefined) {
            if (txtSearchLocationName.length > 0) {
                searchString += "&name=" + txtSearchLocationName.replace(" ", "%20");
            };
        };
      
        if (ddSearchLocationType !== undefined) {
          if (ddSearchLocationType !== "") {
            searchString += "&type=" + ddSearchLocationType.replace(" ", "%20");
          };
        };
      
        if (ddSearchDimension !== undefined) {
          if (ddSearchDimension !== "") {
            searchString += "&dimension=" + ddSearchDimension.replace(" ", "%20");
          };
        };
      
        if (searchString !== "") {
            console.log("Locations.js searchLocations searchString", searchString);
            URL += "?" + searchString;
        };
      
        // console.log(URL);
      
        fetch(URL)
        .then(response => {
            console.log("Locations.js searchLocations response", response);
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
            console.log("Locations.js searchLocations err", err);
            setErrMessage(err);
        });

    };

    return (
        <React.Fragment>
                {errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : ""}
                <Row className="m-2">
                <FormGroup className="m-2">
                <Input type="text" id="txtSearchLocationName" placeholder="Name" onChange={(event) => {/*console.log(event.target.value);*/ setTxtSearchLocationName(event.target.value);}} />
                </FormGroup>
                <FormGroup className="m-2">
                <Input type="select" id="ddSearchLocationType" onChange={(event) => {/*console.log(event.target.value);*/ setDdSearchLocationType(event.target.value);}} >
                    <option value="">Select Type</option>
                    {arraySearchLocationTypes.length > 0 ? arraySearchLocationTypes.map((type) => {
                        // console.log("Locations.js arraySearchLocationTypes.map type", type);
                    return (
                        <option key={type} value={type}>{type}</option>
                        )
                    })
                    : null}
                </Input>
                </FormGroup>
                <FormGroup className="m-2">
                <Input type="select" id="ddSearchDimension" onChange={(event) => {/*console.log(event.target.value);*/ setDdSearchDimension(event.target.value);}} >
                    <option value="">Select Dimension</option>
                    {arraySearchDimensions.length > 0 ? arraySearchDimensions.map((dimension) => {
                        // console.log("Locations.js arraySearchDimensions.map dimension", dimension);
                    return (
                        <option key={dimension} value={dimension}>{dimension}</option>
                        )
                    })
                    : null}
                </Input>
                </FormGroup>
                </Row>
                <Row className="m-2">
                <FormGroup className="m-2">
                    <Button id="btnSearchLocations" color="primary" size="lg" className="ml-4 m-2 p-2" onClick={searchLocations}>Search Locations</Button>
                </FormGroup>
                </Row>
        </React.Fragment>
    );
};

export default Locations;