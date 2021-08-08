import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {ICompanyWithId} from "../../utils/Interfaces/InterfacesApi";



const companyAdapter = createEntityAdapter<ICompanyWithId>();
const initialState = companyAdapter.getInitialState();


const companySlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        upsertCompanies: companyAdapter.upsertMany,
        upsertCompany: companyAdapter.upsertOne,
        removeCompany: companyAdapter.removeOne
    }
})


export const {selectById: selectCompanyById} = companyAdapter.getSelectors();
export const {upsertCompanies, upsertCompany, removeCompany} = companySlice.actions;
export default companySlice.reducer;
