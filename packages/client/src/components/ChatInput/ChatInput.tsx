import React, { useState } from "react";
import cx from "classnames";

import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Send from "@material-ui/icons/Send";
import { Mutation, MutationFunction } from "react-apollo";
import gql from "graphql-tag";

import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";

import { User } from "../../types";

interface ChatInputOwnProps {
  user: User;
  className?: string;
}

type ChatInputProps = ChatInputOwnProps & WithStyles;

const styles: StyleRulesCallback<Theme, {}> = theme => ({
  root: {
    padding: theme.spacing() + "px"
  }
});

const ADD_MESSAGE_MUTATION = gql`
  mutation($userId: String, $text: String) {
    addMessage(userId: $userId, text: $text) {
      id
      text
      userId
    }
  }
`;

export const ChatInput: React.FC<ChatInputProps> = props => {
  const [value, setValue] = useState("");

  const handleSubmit: React.FormEventHandler & React.MouseEventHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> &
      React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
  };

  return (
    <Mutation mutation={ADD_MESSAGE_MUTATION}>
      {(
        addMessage: MutationFunction<any, { userId: String; text: String }>
      ) => (
        <form
          className={cx(props.className, props.classes["root"])}
          noValidate
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            value &&
              addMessage({
                variables: { userId: props.user.id, text: value }
              }).then(() => {
                setValue("");
              });
          }}
        >
          <TextField
            placeholder="Message"
            fullWidth
            margin="normal"
            value={value}
            onChange={e => setValue(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              endAdornment: (
                <Fab
                  size="small"
                  onClick={() =>
                    addMessage({
                      variables: { userId: props.user.id, text: value }
                    }).then(() => setValue(""))
                  }
                  disabled={!value}
                >
                  <Send />
                </Fab>
              )
            }}
          />
        </form>
      )}
    </Mutation>
  );
};

export default withStyles(styles)(ChatInput);
