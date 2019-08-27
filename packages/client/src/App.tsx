import React from "react";

import List from "./components/List";

import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";
import { height } from "@material-ui/system";

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
  input: {
    height: "100px"
  }
});

const App: React.FC<AppProps> = props => {
  return (
    <div className={props.classes["root"]}>
      <List className={props.classes["list"]} />
      <div className={props.classes["input"]}></div>
    </div>
  );
};

export default withStyles(styles)(App);
