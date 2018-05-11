// Imports
import Immutable from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import withRedux from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// App Imports
import config from './config';
import repos from '../modules/home/api/homeState';

const rootReducer = combineReducers({
  repos,
});

console.log(config, 'config');
function createMiddlewares({ isServer }) {
  const middlewares = [
    thunkMiddleware,
  ];

  if (config.env === 'development' && typeof window !== 'undefined') {
    middlewares.push(createLogger({
      level: 'info',
      collapsed: true,
      stateTransformer: (state) => {
        const newState = {};
        /* eslint-disable */
        for (const i of Object.keys(state)) {
          if (Immutable.Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS();
          } else {
            newState[i] = state[i];
          }
        }
        /* eslint-enable */

        return newState;
      },
    }));
  }

  return middlewares;
}

function immutableChildren(obj) {
  const state = {};
  Object.keys(obj).map((key) => {
    state[key] = Immutable.fromJS(obj[key]);
  });
  return state;
}

export const initStore = (initialState = {}, context) => {
  const { isServer } = context;
  const middlewares = createMiddlewares({ isServer });
  const state = immutableChildren(initialState);

  return createStore(
    rootReducer,
    state,
    compose(applyMiddleware(...middlewares)),
  );
};

export default comp => withRedux(initStore)(comp);
