import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

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

export const Login: React.FC = () => {
  const classes = useStyles();
  const [userName, setUserName] = React.useState<String>();
  return (
    <Card className={classes.root}>
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
          InputLabelProps={{}}
        />
      </CardContent>
      <CardActions>
        <Button size="small">Login</Button>
      </CardActions>
    </Card>
  );
};

export default Login;
