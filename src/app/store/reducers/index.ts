import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import {
  layoutReducer,
  LayoutState,
} from "../entities/layouts/layout-reducers";
import { environment } from "src/environments/environment";


export interface AppState {
  layout: LayoutState;




}

export const reducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
  };

// clear store on logout action
export function clearStore(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [clearStore]
  : [clearStore];

export const appState = (state: AppState) => state;



export interface AppState {
  layout: LayoutState;
}



// clear store on logout action



