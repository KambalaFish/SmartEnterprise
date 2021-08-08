import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit";
import filterReducer from './slices/filterSlice';
import companyTableReducer from './slices/companyTableSlice';
import companiesReducer from './slices/companySlice';


const reducer = combineReducers({
    filter: filterReducer,
    companyTable: companyTableReducer,
    companies: companiesReducer
//    someReducer: someReducer
});

const store = configureStore({
    reducer, //=reducer: reducer,
    // middleware: [...getDefaultMiddleware({thunk: false})]
});
export type RootState = ReturnType<typeof reducer>;
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
