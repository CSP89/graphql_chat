import React from "react";
import { format } from "date-fns";

import Box from "@material-ui/core/Box";
import MList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";

type ListProps = WithStyles;

const styles: StyleRulesCallback<Theme, {}> = () => ({
  secondaryFont: {
    fontFamily: "'Roboto Mono', monospace",
    fontSize: "8pt"
  }
});

export const List: React.SFC<ListProps> = props => (
  <Box>
    <MList>
      <ListItem>
        <ListItemText
          primary="test"
          secondary={
            <span className={props.classes["secondaryFont"]}>
              <Typography component="span" variant="body2" color="textPrimary">
                Ali Connors
              </Typography>
              {` - ${format(new Date(), "iiii, dd. MMMM yyyy | hh:mm")}`}
            </span>
          }
        />
      </ListItem>
    </MList>
  </Box>
);

export default withStyles(styles)(List);
