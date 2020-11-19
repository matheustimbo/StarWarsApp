import createDataContext from './createDataContext';

export interface PeopleContext {
  peoples: string[];
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
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
  id: number;
}

const peopleReducer = (state: PeopleContext, action: ActionType) => {
  switch (action.type) {
    case 'request_load':
      return {...state, loadingPeople: true};
    case 'load_failure':
      return {...state, loadingPeople: false};
    case 'load_success':
      return {
        ...state,
        loadingPeople: false,
        peoples: [...state.peoples, ...action.payload],
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
  peopleReducer,
  {
    //methods
    requestLoad,
    loadFailure,
    loadSuccess,
  },
  {
    //initial state
    peoples: [],
    loadingPeople: false,
  },
);
