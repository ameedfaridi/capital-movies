import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { navbarList } from "../../assets/json/navbarList";
import { useAuthContext } from "../../context/useAuthContext";
import { useSidebarContext } from "../../context/useSidebarContext";
import { useUIContext } from "../../context/useUIContext";
import useGetDimentationsByRef from "../../hooks/useGetDimensionWithRef";
import { setListItem } from "../../reducers/sidebar/actions";
import { toggleModal } from "../../reducers/ui/actions";

const useStyles = makeStyles((theme) => ({
  root: ({ widthObj }) => ({
    borderRight: "0.5px solid rgba(0,0,0,0.1)",
    minHeight: "100vh",
    position: "sticky",
    overflow: "hidden",
    ...widthObj,
  }),
  titleContainer: {
    padding: theme.spacing(1, 4),
    borderLeft: `4px solid #fff`,
  },
  dot: {
    color: theme.palette.secondary.main,
    fontSize: theme.spacing(5),
  },
  title: {
    color: theme.palette.title.main,
  },
  menuIcon: {
    color: "rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "0.3s",
  },
  menuContainer: {
    marginTop: theme.spacing(3),
  },
  menuTextContainer: {
    padding: theme.spacing(0, 4),
    borderLeft: `4px solid #fff`,
  },
  menuItemContainer: {
    marginTop: theme.spacing(3),
  },
  list: {},
  listItemContainer: {
    // borderLeft: `4px solid ${theme.palette.secondary.main}`,
  },
  listItem: {
    cursor: "pointer",
    paddingLeft: theme.spacing(4),
    borderRadius: theme.spacing(0.3),
    borderLeft: `4px solid #fff`,
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(5, 0),
    "& p": {
      marginLeft: theme.spacing(1),
    },
    transition: "0.3s",
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
    "& p": {
      fontWeight: 500,
    },
  },
  locked: {
    color: theme.palette.grey[300],
    "& svg": {
      color: theme.palette.grey[300],
    },
  },
}));

export default function SideBar() {
  const theme = useTheme();
  const [isMobileMenuClicked, setIsMobileMenuClicked] = useState(false);
  const sidebarRef = useRef();
  const [width] = useGetDimentationsByRef(sidebarRef);
  const widthObj = isMobileMenuClicked ? { minWidth: 200 } : {};
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, dispatch] = useSidebarContext();
  const [uiState, uiDispatch] = useUIContext();
  const [authState, authDispatch] = useAuthContext();
  const classes = useStyles({ widthObj });
  const router = useRouter();

  React.useEffect(() => {
    switch (router.pathname) {
      case "/discover":
        dispatch(setListItem("Home"));
        break;
      case "/discover/popular-movies":
        dispatch(setListItem("Popular Movies"));
        break;
      case "/discover/rated-movies":
        dispatch(setListItem("Rated Movies"));
        break;
      case "/discover/favourite-movies":
        dispatch(setListItem("Favourite Movies"));
        break;
    }
  }, [router.pathname]);

  const handleRoute = (listItem, isFavorite) => {
    if (isFavorite && !authState.isLogin) {
      uiDispatch(toggleModal());
      router.replace(`${router.pathname}?from=favourite-movies`, undefined, {shallow:true});
      return;
    }
    dispatch(setListItem(listItem.name));
    router.push(listItem.route);
  };

  return (
    <React.Fragment>
      <div className={classes.root} ref={sidebarRef}>
        <div className={classes.titleContainer}>
          {!isMobile ? (
            <Typography variant="h6" className={classes.title} color="primary">
              Capital Movies<span className={classes.dot}>.</span>
            </Typography>
          ) : (
            <MenuRounded
              onClick={() => setIsMobileMenuClicked((p) => !p)}
              className={classes.menuIcon}
            />
          )}
        </div>
        <div className={classes.menuContainer}>
          <div className={classes.menuTextContainer}>
            <Typography variant="caption" color="textSecondary">
              Menu
            </Typography>
          </div>
          <div className={classes.menuItemContainer}>
            <div className={classes.list}>
              <div className={classes.listItemContainer}>
                {navbarList.map((listItem, i) => (
                  <div
                    key={listItem.name}
                    className={clsx({
                      [classes.listItem]: true,
                      [classes.activeListItem]:
                        state.activeListItem === listItem.name,
                      [classes.locked]:
                        navbarList.length - 1 === i && !authState.isLogin,
                    })}
                    onClick={() =>
                      handleRoute(listItem, navbarList.length - 1 === i)
                    }
                  >
                    {listItem.icon({
                      fontSize: "small",
                      color:
                        state.activeListItem === listItem.name
                          ? "secondary"
                          : "disabled",
                    })}
                    {(!isMobile || isMobileMenuClicked) &&
                      listItem.text({ name: listItem.name })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
