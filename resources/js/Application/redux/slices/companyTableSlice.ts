import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction, Update} from "@reduxjs/toolkit";
import {
    ICompanyFilter,
    ICompanyWithId,
    PageResponse
} from "../../utils/Interfaces/InterfacesApi";
import {AppDispatch, RootState} from "../configureStore";
import api from "../../utils/Api";
import {upsertCompanies} from "./companySlice";

export type FetchingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
    const companyPagesAdapter = createEntityAdapter<CompanyPage>(
        {
            selectId: model => model.pageNumber,
            sortComparer: (a, b) => a.pageNumber>b.pageNumber? 1 : a.pageNumber<b.pageNumber? -1 : 0
        }
    );
    const initialState = companyPagesAdapter.getInitialState({
        status: 'idle',
        perPage: 1,
        lastPage: 1
    });

type CompanyPage = {
    data: number[],
    pageNumber: number,
}

export type fetchCompanyPageReturnType = {
    data: number[];
    perPage: number;
    lastPage: number;
    pageNumber: number,
}

type fetchCompanyPayloadCreatorArgType = {
    pageNumber: number,
    filter: ICompanyFilter,
}

export const fetchCompanyPage = createAsyncThunk<fetchCompanyPageReturnType, fetchCompanyPayloadCreatorArgType, {
    dispatch: AppDispatch,
    state: RootState
}>(
    'companyTable/fetchCompanyPage',
    async ({pageNumber, filter}, apiThunk) => {
        try {
            const result = await api().getPaginatedCompanies(pageNumber, filter);
            const response : PageResponse<ICompanyWithId[]> = result.response as PageResponse<ICompanyWithId[]>;
            apiThunk.dispatch(upsertCompanies(response.data));
            const {perPage, lastPage} = response.meta;
            return {data: response.data.map(item => item.id), perPage, lastPage, pageNumber}
        } catch (reason) {
            // return Promise.reject(reason.response.error);
            throw reason.response.error;
        }
    })

const companyTableSlice = createSlice({
    name: 'companyTable',
    initialState,
    reducers: {
        removeFrom: (state, action: PayloadAction<number>) => {
            companyPagesAdapter.removeMany(state, state.ids.filter(item => item >= action.payload));
        },
        removeLastPage: (state) =>{
            if (state.ids.includes(state.lastPage)){
                companyPagesAdapter.removeOne(state, state.lastPage);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCompanyPage.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchCompanyPage.fulfilled, (state, action) => {
            const {pageNumber, perPage, lastPage, data} = action.payload;
            const company = state.entities[pageNumber];
            if (company == undefined){
                companyPagesAdapter.addOne(state, {
                    data,
                    pageNumber,
                });
                state.status = 'succeeded';
                state.perPage = perPage;
                state.lastPage = lastPage;
                return state;
            }
            return {
                ...state,
                status: 'succeeded',
                perPage,
                lastPage
            }
        });
        builder.addCase(fetchCompanyPage.rejected, (state, action) => {
            state.status = 'failed';
        })
    }
});

//возможно дёртифай не нужен

export const selectLastPage = (state: RootState): number => state.companyTable.lastPage;
export const selectPerPage = (state: RootState): number => state.companyTable.perPage;
export const selectStatus = (state: RootState): string => state.companyTable.status;
export const selectCompanyPage = (state: RootState, page: number): CompanyPage|undefined => state.companyTable.entities[page];
export const selectData = (state: RootState, page: number): number[]|undefined => state.companyTable.entities[page]?.data;
export const {removeFrom, removeLastPage} = companyTableSlice.actions;
export default companyTableSlice.reducer;
// https://redux-toolkit.js.org/api/createEntityAdapter
