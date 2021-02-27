import * as React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useState } from "react";


import { gql, useLazyQuery} from "@apollo/client";


export const CHARACTER_QUERY = gql`
  query queryCharacter($search: String!) {
    Character (search: $search) {
      name {
        full
        native
      }
      image {
        medium
      }
    }
  }
`;

export const STAFF_QUERY = gql`
  query queryStaff($search: String!) {
    Staff (search: $search) {
      name {
        full
        native
      }
      image {
        medium
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    
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
  },
  media: {
    backgroundSize: "contain",
    backgroundPosition: "left",
    height: "150px",
    margin: "10px"
  }
 
}));

function AniSearch() {
  const classes = useStyles();

  const [getCharacter, characterResult] = useLazyQuery(CHARACTER_QUERY);
  const [getStaff, staffResult] = useLazyQuery(STAFF_QUERY);
  const [searchText, setSearchText] = useState("");
  const [value, setValue] = useState("");
  
  const handleSelectChange = (event) => {
    console.log("Select",event.target.value);
    if (event.target.value === "1") {
      getCharacter({ variables: { search: searchText }})
    } else if (event.target.value === "2"){
      getStaff({ variables: { search: searchText }})
    }
    setValue(event.target.value)
  };

  const handleTextChange = (event) => {
    setSearchText(event.target.value)
  };

  const searchAni = () => {
    console.log(value === "1")
    console.log(value === "2")
    if (value === "1") {
      getCharacter({ variables: { search: searchText }})
      console.log(characterResult)
    } else if (value === "2"){
      getStaff({ variables: { search: searchText }})
      console.log(staffResult)
    }else {
      getCharacter({ variables: { search: searchText }})
      console.log(characterResult)
    }
  }
 
  return (
  <Container component="form" className={classes.root}>
    <FormControl className={classes.formControl}>
      <InputLabel id="simple-select-label">Search Type</InputLabel>
      <Select
          labelId="simple-select-label"
          id="simple-select"
          onChange={handleSelectChange}
          value={value}
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
    {characterResult.data && characterResult.data.Character &&
    <Card>
       <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {characterResult.data.Character.name.native}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={characterResult.data.Character.image.medium}
          title="image"
        />
      </Card>
    }
    {staffResult.data && staffResult.data.Staff &&
    <Card>
       <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {staffResult.data.Staff.name.native}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={staffResult.data.Staff.image.medium}
          title="image"
        />
      </Card>
    }
  </Container>);
}

export default AniSearch;
