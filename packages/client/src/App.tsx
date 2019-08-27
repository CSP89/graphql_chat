import React from "react";

import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";

import List from "./components/List";
import ChatInput from "./components/ChatInput";

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
  return (
    <div className={props.classes["root"]}>
      <ChatInput className={props.classes["input"]} />
      <List className={props.classes["list"]} />
    </div>
  );
};

export default withStyles(styles)(App);
