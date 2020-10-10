import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Form, FormGroup, Input, Button} from "reactstrap";

const Characters = (props) => {

    // console.log("Characters.js props.charactersURL", props.charactersURL);
    // console.log("Characters.js props.paginationURL", props.paginationURL);
    // console.log("Characters.js props.arrayLocations", props.arrayLocations);
    // console.log("Characters.js props.arrayEpisodes", props.arrayEpisodes);
    // console.log("Characters.js props.arraySearchSpecies", props.arraySearchSpecies);
    // console.log("Characters.js props.arraySearchCharacterTypes", props.arraySearchCharacterTypes);

    // Build lookup arrays
    const [arrayLocations, setArrayLocations] = useState(props.arrayLocations);
    const [arrayEpisodes, setArrayEpisodes] = useState(props.arrayEpisodes);

    const [arraySearchSpecies, setArraySearchSpecies] = useState(props.arraySearchSpecies);
    const [arraySearchCharacterTypes, setArraySearchCharacterTypes] = useState(props.arraySearchCharacterTypes);

    const [ddSearchSpecies, setDdSearchSpecies] = useState("");

    useEffect(() => {
        console.log("Characters.js useEffect props.arrayLocations", props.arrayLocations);
        setArrayLocations(props.arrayLocations);
    }, [props.arrayLocations]);

    useEffect(() => {
        console.log("Characters.js useEffect props.arrayEpisodes", props.arrayEpisodes);
        setArrayEpisodes(props.arrayEpisodes);
    }, [props.arrayEpisodes]);

    useEffect(() => {
        console.log("Characters.js useEffect props.arraySearchSpecies", props.arraySearchSpecies);
        setArraySearchSpecies(props.arraySearchSpecies);
        buildSearchSpeciesLookup();
    }, [props.arraySearchSpecies]);

    useEffect(() => {
        console.log("Characters.js useEffect props.arraySearchCharacterTypes", props.arraySearchCharacterTypes);
        setArraySearchCharacterTypes(props.arraySearchCharacterTypes);
    }, [props.arraySearchCharacterTypes]);

    const buildSearchSpeciesLookup = () => {
        let searchSpecies;
        if (arraySearchSpecies.length > 0) {
            searchSpecies = arraySearchSpecies.map((species) => {
                return (
                    <option value={species}>{species}</option>
                    )
                })
            };

        console.log("Characters.js buildSearchSpeciesLookup searchSpecies", searchSpecies);

        setDdSearchSpecies(searchSpecies);
    };

    return (
        <React.Fragment>
            <Form id="frmSearch">
                <FormGroup>
                <Input type="text" id="txtSearchCharacterName" placeholder="Name" />
                </FormGroup>
                <FormGroup>
                <Input type="select" id="ddSearchSpecies">
                    <option value="">Select Species</option>
                    {arraySearchSpecies.length > 0 ? arraySearchSpecies.map((species) => {
                    return (
                        <option value={species}>{species}</option>
                        )
                    })
                    : null}
                </Input>
                </FormGroup>
                <FormGroup>
                <Input type="select" id="ddSearchCharacterType">
                    <option value="">Select Type</option>
                </Input>
                </FormGroup>
                <FormGroup>
                <Input type="select" id="ddSearchStatus">
                    <option value="">Select Status</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </Input>
                </FormGroup>
                <FormGroup>
                <Input type="select" id="ddSearchGender">
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </Input>
                </FormGroup>
                <FormGroup>
                    <Button id="btnSearchCharacters" color="primary" size="lg">Search Characters</Button>
                </FormGroup>
            </Form>
        </React.Fragment>
    );
};

export default Characters;