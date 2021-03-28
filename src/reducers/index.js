import { combineReducers } from 'redux';
import auth from './auth';
import partys from './partys';
export default combineReducers({ partys, auth })