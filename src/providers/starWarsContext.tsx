import createDataContext from './createDataContext';

export interface StarWarsContext {
  people: string[];
  loadingPeople: Boolean;
}

export interface ActionType {
  type: string;
  payload: any;
}

export interface People {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  movies: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  url: string;
}

const starWarsReducer = (state: StarWarsContext, action: ActionType) => {
  switch (action.type) {
    case 'request_load':
      return {...state, loadingPeople: true};
    case 'load_failure':
      return {...state, loadingPeople: false};
    case 'load_success':
      return {
        ...state,
        loadingPeople: false,
        people: [...state.people, ...action.payload],
      };
    default:
      return state;
  }
};

export const requestLoad = (dispatch: Function) => () =>
  dispatch({type: 'request_load'});

export const loadFailure = (dispatch: Function) => () =>
  dispatch({type: 'load_failure'});

export const loadSuccess = (dispatch: Function) => (newPeople: People[]) =>
  dispatch({type: 'load_success', payload: newPeople});

export const {Provider, Context} = createDataContext(
  starWarsReducer,
  {
    //methods
    requestLoad,
    loadFailure,
    loadSuccess,
  },
  {
    //initial state
    people: [],
    loadingPeople: false,
  },
);
