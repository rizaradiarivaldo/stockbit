import { GET_ALL_MOVIE, GET_DETAIL } from "../types";

const initialState = {
  data: [],
  detail: {},
  isLoading: false,
  isError: false,
  errMessage: "",
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_MOVIE}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_ALL_MOVIE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        data:
          action.payload.Response === "True" && action.payload.page > 1
            ? [...state.data, ...action.payload.Search]
            : action.payload.Response === "True" && action.payload.page === 1
            ? action.payload.Search
            : [],
        // data:
        //   action.payload.Response === "True"
        //     ? [...state.data, ...action.payload.Search]
        //     : [],
        errMessage:
          action.payload.Response === "False" ? action.payload.Error : "",
      };
    case `${GET_ALL_MOVIE}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMessage: "Server error!",
      };

    case `${GET_DETAIL}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_DETAIL}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        detail: action.payload.Response === "True" ? action.payload : {},
        errMessage:
          action.payload.Response === "False" ? action.payload.Error : "",
      };
    case `${GET_DETAIL}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMessage: "Server error!",
      };

    default:
      return state;
  }
};

export default moviesReducer;
