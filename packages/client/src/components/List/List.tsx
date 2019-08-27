import React from "react";
import { format, parseISO } from "date-fns";
import cx from "classnames";
import gql from "graphql-tag";

import Box from "@material-ui/core/Box";
import MList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import {
  Query,
  Subscription,
  QueryResult,
  OnSubscriptionDataOptions
} from "react-apollo";

import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";

import { Message } from "../../types";

interface ListOwnProps {
  className?: string;
}

type ListProps = ListOwnProps & WithStyles;

const styles: StyleRulesCallback<Theme, {}> = () => ({
  root: {
    overflowY: "auto"
  },
  secondaryFont: {
    fontFamily: "'Roboto Mono', monospace",
    fontSize: "8pt"
  }
});

const QUERY_MESSAGES = gql`
  query {
    messages {
      id
      text
      userId
      date
    }
  }
`;

const QUER_USER = gql`
  query($id: String!) {
    user(id: $id) {
      id
      name
    }
  }
`;

const SUBSCRIBE_MESSAGES = gql`
  subscription {
    messageAdded {
      id
      text
      userId
      date
    }
  }
`;

const Entry = (message: Message, props: ListProps) => {
  return (
    <ListItem key={message.id}>
      <ListItemText
        primary={message.text}
        secondary={
          <span className={props.classes["secondaryFont"]}>
            <Query query={QUER_USER} variables={{ id: message.userId }}>
              {({ data }: QueryResult<{ user: { name: String } }>) => (
                <>
                  {data && data.user && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {data.user.name}
                    </Typography>
                  )}
                </>
              )}
            </Query>
            {` - ${format(
              parseISO(message.date),
              "iiii, dd. MMMM yyyy | hh:mm:ss"
            )}`}
          </span>
        }
      />
    </ListItem>
  );
};

export const List: React.FC<ListProps> = props => {
  const [subscribed, setSubscribed] = React.useState([] as Message[]);
  return (
    <Box className={cx(props.className, props.classes["root"])}>
      <MList>
        <Subscription
          subscription={SUBSCRIBE_MESSAGES}
          onSubscriptionData={({
            subscriptionData
          }: OnSubscriptionDataOptions<{ messageAdded: Message }>) => {
            const { loading, error, data } = subscriptionData;
            if (data) setSubscribed([data.messageAdded, ...subscribed]);
          }}
        />
        {subscribed.map(message => Entry(message, props))}
        <Query query={QUERY_MESSAGES}>
          {({
            data,
            error,
            loading
          }: QueryResult<
            {
              messages: Message[];
            },
            Record<string, any>
          >) => {
            if (loading) return <></>;
            if (error) return <></>;
            if (data) {
              return (
                <>
                  {data.messages
                    .reverse()
                    .map(message => Entry(message, props))}
                </>
              );
            }
            return null;
          }}
        </Query>
      </MList>
    </Box>
  );
};

export default withStyles(styles)(List);
