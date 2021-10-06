import axios from "axios";
import { GET_ALL_MOVIE, GET_DETAIL } from "../types";

export const GET_ALL_MOVIES = ({ title, page }) => {
  let _title = title === "" ? "batman" : title;
  return {
    type: GET_ALL_MOVIE,
    payload: new Promise((resolve, reject) => {
      let url = `https://www.omdbapi.com/?apikey=4b5a6af0&s=${_title}&page=${page}
      `;
      axios
        .get(url)
        .then((res) => {
          resolve({ ...res.data, page });
        })
        .catch((err) => {
          console.log(err);
        });
    }),
  };
};

export const GET_DETAILS = (id) => {
  return {
    type: GET_DETAIL,
    payload: new Promise((resolve, reject) => {
      let url = `https://www.omdbapi.com/?i=${id}&apikey=4b5a6af0`;
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }),
  };
};

//
