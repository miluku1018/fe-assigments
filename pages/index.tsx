import * as React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { gql, useLazyQuery } from "@apollo/client";

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
  // TODO
}));

function AniSearch() {
  const classes = useStyles();

  const [getCharacter, characterResult] = useLazyQuery(CHARACTER_QUERY);
  const [getStaff, staffResult] = useLazyQuery(STAFF_QUERY);

  // TODO

  return <Container>{/* TODO */}</Container>;
}

export default AniSearch;
