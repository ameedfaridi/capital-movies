import { makeStyles, Typography } from "@material-ui/core";
import { discover, random } from "../../assets/constants";
import Header from "../../components/layout/Header";
import Banner from "../../components/rhs/Banner";
import PosterCard from "../../components/rhs/PosterCard";
import PosterContainer from "../../components/rhs/PosterContainer";
import Layout from "../../layout";

export const usePageStyles = makeStyles((theme) => ({
  rhs: {
    flex: 1,
    overflowY: "scroll",
  },
  padding: {
    padding: theme.spacing(1, 5),
  },
}));

export default function Home({initialMovieData}) {
  const classes = usePageStyles();
  const bannerMovie = initialMovieData.results[2];
  return (
    <Layout pageName="Popular movies">
      <div className={classes.rhs}>
        <Header />
        <Banner movie={[bannerMovie]}/>
        <Typography className={classes.padding}>Popular Movies</Typography>
        <PosterContainer>
         {initialMovieData.results.slice(0,10).map(item=> <PosterCard {...item} key={item.id}  width={300} />)}
          {/* <PosterCard />
          <PosterCard />
          <PosterCard />
          <PosterCard /> */}
        </PosterContainer>
        <Typography className={classes.padding}>Rated Movies</Typography>
        <PosterContainer>
         {initialMovieData.results.slice(10,initialMovieData.results.length).map(item=> <PosterCard {...item} key={item.id}  width={300} />)}
        </PosterContainer>
      </div>
    </Layout>
  );
}


export async function getStaticProps() {
  const response = await fetch(random);
  const data = await response.json();

  return {
    props: {
      initialMovieData: data || [],
    },
  };
}