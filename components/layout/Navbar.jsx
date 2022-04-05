import { Button, IconButton, makeStyles, Typography } from "@material-ui/core";
import { TheatersRounded } from "@material-ui/icons";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { navbarList } from "../../assets/json/navbarList";

const useStyles = makeStyles(({ spacing }) => ({
    root: {
      border: "1px solid #000",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: spacing(2, 5),
    },
    flex: {
      display: "flex",
      alignItems: "center",
    },
    margin: {
      marginRight: spacing(2),
      cursor: "pointer",
    },
  }));
  
  
  export function NavBar() {
    const classes = useStyles();
    
    return (
      <React.Fragment>
        <div className={classes.root}>
          <div className={classes.flex}>
            <IconButton>
              <TheatersRounded color="primary" fontSize="large" />
            </IconButton>
            <Typography variant="h6" color="secondary">
              Captial Movies
            </Typography>
          </div>
          <div className={classes.flex}>
            {navbarList.map((listItem) => (
              <Link href={listItem.route} key={listItem.route}>
                <a>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    className={classes.margin}
                  >
                    {listItem.name}
                  </Typography>
                </a>
              </Link>
            ))}
            <Button color="secondary" variant="contained" onClick={()=>router.push('/sign-up')}>
              Get Started
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }