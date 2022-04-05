import { Button, IconButton, Typography } from "@material-ui/core";
import { Add, FavoriteRounded } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { ImageUrl } from "../../assets/constants";

const useBannerStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 4),
    width: "100%",
  },
  bannerContainer: ({image})=>({
    width: "100%",
    minHeight: "50vh",
    borderRadius: theme.spacing(3),
    backgroundImage: `url(${image}), linear-gradient(to bottom,rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.8) 80%)`,
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    backgroundSize:"cover",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "flex-end",
    "& ::after": {
      content: "",
      height: 100,
      width: 100,
      backgroundColor: "black",
    },
  }),
  info: {
    marginBottom: theme.spacing(2),
  },
  title: {
    color: "#fff",
    fontWeight: 900,
    marginBottom: theme.spacing(2),
  },
  rating: {
    color: "#fff",
    marginBottom: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  btn: {
    marginRight: theme.spacing(1),
  },
}));

export default function Banner({movie}) {
  const classes = useBannerStyles({image:`${ImageUrl}${movie[0].poster_path}`});

  return (
    <div className={classes.root}>
      <div className={classes.bannerContainer}>
        <div className={classes.info}>
          <Typography variant="h4" className={classes.title}>
            {movie[0]?.title}
          </Typography>
          <Typography variant="subtitle1" className={classes.rating}>
            Rating:
            <Rating name="size-small" value={movie[0]?.vote_average/2} size="small" readOnly />
          </Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
              size="small"
            >
              Add to Favourite
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
