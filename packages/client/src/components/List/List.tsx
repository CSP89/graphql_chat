import React from "react";
import { format, parseISO } from "date-fns";
import cx from "classnames";
import gql from "graphql-tag";

import Box from "@material-ui/core/Box";
import MList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import { Query, QueryResult } from "react-apollo";

import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";

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

export const List: React.FC<ListProps> = props => (
  <Box className={cx(props.className, props.classes["root"])}>
    <MList>
      <Query query={QUERY_MESSAGES}>
        {({
          data,
          error,
          loading
        }: QueryResult<
          {
            messages: {
              id: string;
              text: string;
              userId: string;
              date: string;
            }[];
          },
          Record<string, any>
        >) => {
          if (loading) return <></>;
          if (error) return <></>;
          if (data)
            return (
              <>
                {data.messages.reverse().map(message => (
                  <ListItem key={message.id}>
                    <ListItemText
                      primary={message.text}
                      secondary={
                        <span className={props.classes["secondaryFont"]}>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Ali Connors
                          </Typography>
                          {` - ${format(
                            parseISO(message.date),
                            "iiii, dd. MMMM yyyy | hh:mm:ss"
                          )}`}
                        </span>
                      }
                    />
                  </ListItem>
                ))}
              </>
            );
          return null;
        }}
      </Query>
    </MList>
  </Box>
);

export default withStyles(styles)(List);
