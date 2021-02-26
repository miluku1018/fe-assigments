import * as React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useState } from "react";


import { gql, useLazyQuery, useQuery } from "@apollo/client";


export const CHARACTER_QUERY = gql`
  query queryCharacter($search: String!) {
    name {
      full
      native
    }
    image {
      medium
    }
  }
`;

export const STAFF_QUERY = gql`
  query queryStaff($search: String!) {
    name {
      full
      native
    }
    image {
      medium
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
    fontSize: 12,
  },
  formControl: {
    minWidth: 120,
  },
  textField: {
    width: 300,
    marginLeft: "10px",
  },
  button: {
    marginLeft: "20px",
    marginTop: "10px",
  }

}));

function AniSearch() {
  const classes = useStyles();

  const [getCharacter, characterResult] = useLazyQuery(CHARACTER_QUERY);
  const [getStaff, staffResult] = useLazyQuery(STAFF_QUERY);
  const [searchText, setSearchText] = useState("");
  
  const handleSelectChange = (event) => {
    console.log("Select",event.target.value);
  };

  const handleTextChange = (event) => {
    setSearchText(event.target.value)
  };

  const searchAni = () => {
    if(searchText) {
      console.log(searchText)
      getStaff({ variables: { search: searchText }})
    }
    console.log(staffResult.data)
  }
 
  return (
  <Container component="form" className={classes.root}>
    <FormControl className={classes.formControl}>
      <InputLabel id="simple-select-label">Search Type</InputLabel>
      <Select
          labelId="simple-select-label"
          id="simple-select"
          onChange={handleSelectChange}
        >
        <option aria-label="None" value="" />
        <option value={1}>Character</option>
        <option value={2}>Staff</option>
      </Select>
    </FormControl>
    <TextField
      id="standard-basic"
      label="Keyword"
      value={searchText}
      className={classes.textField}
      onChange={handleTextChange}
      
    />
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={searchAni}
    >
      Search
    </Button>
  
    <Grid style={{ marginTop: "20px" }} container spacing={2}>
      
    </Grid>
  </Container>);
}

export default AniSearch;
