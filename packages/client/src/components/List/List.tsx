import React from "react";
import { format } from "date-fns";
import cx from "classnames";

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

export const List: React.SFC<ListProps> = props => (
  <Box className={cx(props.className, props.classes["root"])}>
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
