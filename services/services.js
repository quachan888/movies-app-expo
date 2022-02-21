import axios from 'axios';

const apiURL = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=4a364319375ed2702b522fc312cf8834';

export const getPopularMovies = async () => {
    const response = await axios.get(`${apiURL}/movie/popular?${apiKey}`);
    return response.data.results;
};

export const getUpcommingMovies = async () => {
    const response = await axios.get(`${apiURL}/movie/upcoming?${apiKey}`);
    return response.data.results;
};

export const getPopularTv = async () => {
    const response = await axios.get(`${apiURL}/tv/popular?${apiKey}`);
    return response.data.results;
};

export const getTopRatedMovies = async () => {
    const response = await axios.get(`${apiURL}/movie/top_rated?${apiKey}`);
    return response.data.results;
};

export const getFamilyMovies = async () => {
    const response = await axios.get(
        `${apiURL}/discover/movie?${apiKey}&with_genres=10751`,
    );
    return response.data.results;
};

export const getMovieDetail = async id => {
    const response = await axios.get(`${apiURL}/movie/${id}?${apiKey}`);
    return response.data;
};
