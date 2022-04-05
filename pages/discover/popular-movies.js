import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import { useState } from "react";
import InfiniteLoader from "react-infinite-scroll-component";
import { usePageStyles } from ".";
import { apiURl } from "../../assets/constants";
import InfiniteScroll from "../../components/common/InfiniteScroll";
import Header from "../../components/layout/Header";
import PosterCard from "../../components/rhs/PosterCard";
import Layout from "../../layout";

export default function Popular({ initialMovieData }) {
  const classes = usePageStyles();
  const [movies, setMovies] = useState(initialMovieData.results);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  async function fetchMore() {
    const response = await fetch(apiURl("popular", page));
    const data = await response.json();
    setMovies((prev) => [...prev, ...data.results]);
    setPage(page + 1);
    if (page === initialMovieData.total_pages) {
      setHasMore(false);
    }
  }

  return (
    <Layout pageName="Popular Movies">
      <div className={classes.rhs}>
        <Header />
        <InfiniteScroll
          hasMore={hasMore}
          data={movies}
          next={()=>fetchMore()}
        >
          {movies.map((movie) => {
            return <PosterCard {...movie} key={movie?.id} />;
          })}
        </InfiniteScroll>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await fetch(apiURl("popular"));
  const data = await response.json();

  return {
    props: {
      initialMovieData: data,
    },
  };
}
