import React from "react";
import gql from "graphql-tag";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { Mutation, MutationFunction, MutationResult } from "react-apollo";

import { makeStyles } from "@material-ui/core/styles";
import { User } from "../../types";

interface LoginOwnProps {
  onUserChange: (user: User) => void;
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    transform: "translate(-50%, -50%)",
    left: "50%",
    top: "50%",
    width: "99%",
    maxWidth: "350px"
  }
});

const ADD_USER_MUTATION = gql`
  mutation($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;

export const Login: React.FC<LoginOwnProps> = props => {
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  return (
    <Card className={classes.root}>
      <Mutation
        mutation={ADD_USER_MUTATION}
        onCompleted={({ addUser }: { addUser: User }) =>
          props.onUserChange(addUser)
        }
      >
        {(
          addUser: MutationFunction<any, { name: string }>,
          { error, data }: MutationResult<User>
        ) => (
          <>
            <CardContent>
              <Typography variant="h5" component="h2">
                User
              </Typography>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  addUser({ variables: { name: userName } });
                }}
              >
                Login
              </Button>
            </CardActions>
          </>
        )}
      </Mutation>
    </Card>
  );
};

export default Login;
