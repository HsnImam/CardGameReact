import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const getCards = () => {
  return axios
    .get(`${apiBaseUrl}/api/card`)
    .then(({ data }) => data)
    .catch((err) => err.toString());
};

const getScores = () => {
  return axios
    .get(`${apiBaseUrl}/api/score`)
    .then(({ data }) => data)
    .catch((err) => err.toString());
};

const addScores = (score) => {
  return axios
    .post(`${apiBaseUrl}/api/score`, score)
    .then(({ data }) => data)
    .catch((err) => err.toString());
};

const resetScores = () => {
  return axios
    .get(`${apiBaseUrl}/api/score/reset`)
    .then((res) => res)
    .catch((err) => err.toString());
};

export { getCards, getScores, addScores, resetScores };
