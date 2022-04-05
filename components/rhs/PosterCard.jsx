import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { FavoriteRounded } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { ImageUrl } from "../../assets/constants";
import { useAuthContext } from "../../context/useAuthContext";
import { useUIContext } from "../../context/useUIContext";
import { handleFavourite, isPresent } from "../../helper/utils/handleFavourite";
import { toggleModal } from "../../reducers/ui/actions";

export const usePostersStyles = makeStyles((theme) => ({
  root: ({ width }) => ({
    minWidth: width ?? 200,
    margin: theme.spacing(1, 2),
    position: "relative",
    cursor: "pointer",
    transition: "0.5s",
    "&:hover img": {
      transition: "0.5s",
      transform: "scale(1.05)",
    },
  }),
  imgContainer: {
    borderTopRightRadius: theme.spacing(2),
    borderTopLeftRadius: theme.spacing(2),
    overflow: "hidden",
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
  favourites: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    right: 0,
  },
}));
export default function PosterCard({ width, setParentTrigger,...props }) {
  const classes = usePostersStyles({ width });
  const [uiState, uiDispatch] = useUIContext();
  const [trigger,setTrigger] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [authState, authDispatch] = useAuthContext();

  useEffect(() => {
    if(!authState.isLogin) return setIsAdded(false);
    setIsAdded(isPresent(props.id, authState.email))
  },[trigger, authState.isLogin])

  const handleAddToFavourites = () => {
    if (!authState.isLogin) return uiDispatch(toggleModal());
    handleFavourite(props, isAdded, authState.email);
    setTrigger(p=>!p);
    setParentTrigger && setParentTrigger(p=>!p);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.favourites}>
          <IconButton onClick={handleAddToFavourites}>
            <FavoriteRounded color={isAdded===0 || isAdded  ? "secondary" : "inherit"} />
          </IconButton>
        </div>
        <div className={classes.imgContainer}>
          <img
            src={props.poster_path ? `${ImageUrl}${props.poster_path}` : "/maxresdefault.jpg"}
            width={width ?? 300}
            height={width ?? 300}
          />
        </div>
        <div className={classes.info}>
          <Grid container>
            <GridItem objKey={"Release Date"} objValue={props.release_date} />
            <GridItem
              objKey={"Rating"}
              objComp={
                <Rating
                  name="size-small"
                  value={(props?.vote_average)/2 || Math.floor(Math.random()*4)}
                  size="small"
                  readOnly
                />
              }
            />
            <GridItem objKey={"Title"} objValue={props.title} />
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
}

const GridItem = ({ objKey, objValue, objComp }) => {
  const style = {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  };
  return (
    <Grid item xs={12} container>
      <Grid item xs={5}>
        <Typography variant="subtitle1" color="textSecondary">
          {objKey}
        </Typography>
      </Grid>
      <Grid item xs={7} container justifyContent="flex-end">
        {objComp || (
          <Typography variant="subtitle1" color="textSecondary" style={style}>
            {objValue}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
