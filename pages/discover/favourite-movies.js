import { Box, makeStyles } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { usePageStyles } from ".";
import Header from "../../components/layout/Header";
import PosterCard from "../../components/rhs/PosterCard";
import { useAuthContext } from "../../context/useAuthContext";
import useGetLocalStorageItem from "../../hooks/useGetLocalStorageItem";
import Layout from "../../layout";

const blurStyle = { filter: "blur(3px)" };
const currentPageUrl = "favourite-movies";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "5px",
  },
}));

export default function Home() {
  const classes = usePageStyles();
  const favClasses = useStyles();
  const [authState, authDispatch] = useAuthContext();
  const [trigger, setTrigger] = useState([]);
  const movies = useGetLocalStorageItem([], `belongsTo-${authState.email}`, [
    trigger,
    authState.email,
  ]);

  const style = useMemo(
    () => (authState.isLogin ? {} : blurStyle),
    [authState.isLogin]
  );

  return (
    <Layout pageName="Favourite Movies">
      <div className={classes.rhs} style={style}>
        <Header />
        <div className={movies.length > 0 && favClasses.root}>
          {movies.length === 0 ? (
            <Box display="flex" justifyContent="center" width="100%" height="100%">
              No Favourite Movies
            </Box>
          ) : (
            movies.map((movie) => (
              <PosterCard
                {...movie}
                key={movie.id}
                setParentTrigger={setTrigger}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
