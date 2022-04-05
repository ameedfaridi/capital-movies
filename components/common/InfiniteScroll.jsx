import { makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import InfiniteLoader from "react-infinite-scroll-component";
import PosterLoader from "./PosterLoader";

const useScrollStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "5px",
  },
  skeleton: {
    padding: theme.spacing(0, 1),
  },
  text: {
    transform: "unset",
  },
}));

export default function InfiniteScroll({ children, data, next, hasMore }) {
  const scrollClasses = useScrollStyles();

  return (
    <InfiniteLoader
      dataLength={data.length}
      next={next}
      loader={<PosterLoader classes={scrollClasses} />}
      hasMore={hasMore}
      endMessage={
        <Typography color="textSecondary" style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </Typography>
      }
    >
      <div className={scrollClasses.root}>{children}</div>
    </InfiniteLoader>
  );
}
