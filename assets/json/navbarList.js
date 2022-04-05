import { Typography } from "@material-ui/core";
import {
  ExploreRounded,
  FavoriteRounded,
  FlashOnRounded,
  HomeRounded,
} from "@material-ui/icons";

export const navbarList = [
  {
    name: "Home",
    route: "/discover",
    icon: (props) => <HomeRounded {...props} />,
    text: (props) => <Typography variant="body2">{props.name}</Typography>,
  },
  {
    name: "Popular Movies",
    route: "/discover/popular-movies",
    icon: (props) => <ExploreRounded {...props} />,
    text: (props) => <Typography variant="body2">{props.name}</Typography>,
  },
  {
    name: "Rated Movies",
    route: "/discover/rated-movies",
    icon: (props) => <FlashOnRounded {...props} />,
    text: (props) => <Typography variant="body2">{props.name}</Typography>,
  },
  {
    name: "Favourite Movies",
    route: "/discover/favourite-movies",
    icon: (props) => <FavoriteRounded {...props} />,
    text: (props) => <Typography variant="body2">{props.name}</Typography>,
  },
];
