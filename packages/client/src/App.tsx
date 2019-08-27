import React from "react";
import { Route, Redirect } from "react-router-dom";

import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";

import List from "./components/List";
import ChatInput from "./components/ChatInput";
import { User } from "./types";
import Login from "./components/Login";

type AppProps = WithStyles;

const styles: StyleRulesCallback<Theme, {}> = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  list: {
    flex: 1,
    flexGrow: 1,
    height: "100%"
  },
  input: {}
});

const App: React.FC<AppProps> = props => {
  const [user, handleChangeUser] = React.useState<User>();

  return (
    <div className={props.classes["root"]}>
      <Route
        path="/login"
        component={() => (
          <>
            {user && <Redirect to="/" />}
            <Login onUserChange={handleChangeUser} />
          </>
        )}
      />
      <Route
        exact
        path="/"
        component={() => (
          <>
            {!user && <Redirect to="/login" />}
            {user && (
              <ChatInput className={props.classes["input"]} user={user} />
            )}
            <List className={props.classes["list"]} />
          </>
        )}
      />
    </div>
  );
};

export default withStyles(styles)(App);
