import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Container, Row, Col, FormGroup, Input, Button, Alert} from "reactstrap";
import Episode from "./Episode"

const Episodes = (props) => {

    // console.log("Episodes.js props.url", props.url);
    // console.log("Episodes.js props.paginationURL", props.paginationURL);
    // console.log("Episodes.js props.arrayCharacters", props.arrayCharacters);
    // console.log("Episodes.js props.arrayLocations", props.arrayLocations);

    // Build lookup arrays
    const [arrayCharacters, setArrayCharacters] = useState([]);

    const [url, setUrl] = useState("");
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [nextPage, setNextPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [errMessage, setErrMessage] = useState("");
    const [txtSearchEpisodeName, setTxtSearchEpisodeName] = useState("");
    const [txtEpisode, setTxtEpisode] = useState("");

    useEffect(() => {
        // console.log("Episodes.js useEffect props.arrayCharacters", props.arrayCharacters);
        setArrayCharacters(props.arrayCharacters);
    }, [props.arrayCharacters]);

    useEffect(() => {
        console.log("Episodes.js useEffect url", url);
    }, [url]);

    // useEffect(() => {
    //     // console.log("Episodes.js useEffect results", results);
    //     // console.log("Episodes.js useEffect results.length", results.length);
    // }, [results]);

    const searchEpisodes = () => {

        let buildURL = props.url;
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
            console.log("Episodes.js searchEpisodes searchString", searchString);
            buildURL += "?" + searchString;
        };
      
        console.log("Episodes.js searchEpisodes buildURL", buildURL);

        setUrl(buildURL);
      
        getResults();

    };

    const getResults = () => {
        fetch(url)
        .then(response => {
            console.log("Episodes.js searchEpisodes response", response);
            // if (!response.ok) {
                // throw Error(response.status + " " + response.statusText + " " + response.url);
            // } else {
                // if (response.status === 200) {
                    return response.json();
                // } else {
                //     return response.status;
                // };
            // };
        })
        .then(data => {
            console.log("Episodes.js searchEpisodes data", data);

            if (data.error !== undefined) {
                console.log("Episodes.js searchEpisodes data.error", data.error);
                setErrMessage(data.error);
            } else {

                setLastPage(data.info.pages);

                for (let i = 0; i < data.results.length; i++) {
                    // console.log("Episodes.js searchEpisodes data.results[i].residents", data.results[i].residents);
                    let charactersList = "";
                    let charactersArray = data.results[i].characters;

                    for (let j = 0; j < charactersArray.length; j++) {
                        // console.log("Episodes.js searchEpisodes charactersArray[j]", charactersArray[j]);
                        for (let k = 0; k < arrayCharacters.length; k++) {
                            // console.log("Episodes.js searchEpisodes arrayCharacters[k]", arrayCharacters[k]);
                            if (charactersArray[j].substr(charactersArray[j].lastIndexOf("/") + 1) == arrayCharacters[k].id) {
                              // console.log("Episodes.js searchEpisodes character name", arrayCharacters[k].name, "it's a match");

                              break;
                            };
                          };

                          charactersList += charactersArray[j].substr(charactersArray[j].lastIndexOf("/") + 1);
                          if (j < charactersArray.length - 1) {
                            charactersList += ",";
                          };
                    };

                    // console.log("Episodes.js searchEpisodes charactersList", charactersList);
                    Object.assign(data.results[i], {charactersList: charactersList});

                };

                setResults(data.results);
                setCurrentPage(currentPage++);
            };
        })
        .catch(err => {
            console.log("Episodes.js searchEpisodes err", err);
            setErrMessage(err);
        });

    };

    const getMoreResults = () => {
        console.log("Episodes.js getMoreResults");

        // Removes ?page=# to the URL
        if (url.includes(props.paginationURL)) {
            // console.log(URL);
            setUrl(url.slice(0, -7));
        };

        setNextPage(currentPage + 1);

        // Search Pagination
        setUrl(url + props.paginationURL + nextPage);

        getResults();

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
                {results.length > 0 ?
                <Row className="m-2 border">
                    <Container>
                        <Row className="justify-content-center">
                            <Episode results={results} />
                        </Row>
                        {currentPage < lastPage ?
                        <Row className="justify-content-end p-4">
                            <Col className="text-right">
                            <a href="#" onClick={getMoreResults}>more</a>
                            </Col>
                        </Row>
                        : null}
                    </Container>
                </Row>
                : null}
        </React.Fragment>
    );
};

export default Episodes;