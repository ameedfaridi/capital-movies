export const APP_NAME = "Captial Movies"
export const protectedRoutes = ["/discover/favourite-movies"];
export const API_KEY = "c7a021f957c3b757437da02814317b07";
export const baseUrl = "https://api.themoviedb.org/3/movie"
export const ImageUrl ="https://image.tmdb.org/t/p/original"
export const discover =(page)=> `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc&page=${page}`
export const apiURl =(type, page)=> `${baseUrl}/${type}?api_key=${API_KEY}&language=en&page=${page}`;
export const random = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`