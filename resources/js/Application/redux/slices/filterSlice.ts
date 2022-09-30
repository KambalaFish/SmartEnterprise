import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICompanyFilter} from "../../utils/Interfaces/InterfacesApi";

const initialState: ICompanyFilter = {
    name: '',
    country: '',
    city: '',
    address: '',
    zipCode: '',
    status: 'any'
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers:{
        setFilter: (state, action: PayloadAction<ICompanyFilter>) => ({...state, ...action.payload}),
        initializeFilter: state => ({...state, ...initialState})
    }
});

export const {setFilter, initializeFilter} = filterSlice.actions;
export default filterSlice.reducer;
