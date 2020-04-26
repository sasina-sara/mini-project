import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    width: "100%",
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function TitlebarGridList({ titleData, onSelect }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={220} className={classes.gridList} cols={3}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {titleData.map((tile, index) => (
          <GridListTile key={index}>
            <img src={tile.filename} alt={tile.name} />
            <GridListTileBar
              title={tile.name}
              subtitle={<span>by: {tile.user_id}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.name}`}
                  className={classes.icon}
                  onClick={(event) => {
                    if (onSelect && typeof onSelect === "function") {
                      onSelect(tile);
                    }
                  }}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
