import React, { createContext } from 'react';
import backgroundClient from '../background/client';
import useCommandReducer from './useCommandReducer';

import {
    COMMANDS_UPDATE
} from '../constants';

const initialState = {
    searchTerm: '',
    selectedCommand: null,
    commands: [],
    filteredCommands: []
};
const store = createContext(initialState);
const { Provider } = store;

export const StateProvider = ({ children }) =>  {
    const [state, dispatch] = useCommandReducer();

    backgroundClient.addListener((payload) => {
        console.log('receiving message from background');
        dispatch({type: COMMANDS_UPDATE, payload });
    })

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    );
}

export default store;
