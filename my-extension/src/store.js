import React, {createContext, useReducer} from 'react';
import backgroundService from './background-sync';

const initialState = {
    searchTerm: '',
    selectedCommand: null,
    commands: [],
    filteredCommands: []
};
const store = createContext(initialState);
const { Provider } = store;

function selectCommand(commands, atIndex = 0) {
    if(commands.length === 0) {
        return null;
    }

    const resultingIndex = Math.max(
        Math.min(
            atIndex, commands.length - 1
        ),
    0);
    return resultingIndex;
}

function filterCommands(commands, searchTerm = '') {
    const isEmptySearch = searchTerm === '';
    if(isEmptySearch) {
        return commands;
    }

    return commands.filter(command => 
        command.includes(searchTerm)
    );  
}

export const StateProvider = ({ children }) =>  {
    const [state, dispatch] = useReducer((state, action) => {
        console.log(action);
        const { selectedCommand } = state;
        switch(action.type) {
            case "COMMANDS_UPDATE":
                console.log('COMMANDS_UPDATE');
                return {
                    ...state,
                    commands: [
                        ...action.payload
                    ],
                    filteredCommands: [
                        ...filterCommands(action.payload, state.searchTerm)
                    ],
                };
            case "COMMANDS_FILTER":
                console.log('COMMANDS_FILTER');
                const filteredCommands = filterCommands(state.commands, action.payload);
                return {
                    ...state,
                    searchTerm: action.payload,
                    selectedCommand: selectCommand(filteredCommands),
                    filteredCommands: [
                        ...filteredCommands
                    ]
                }
            case "COMMANDS_SELECT_UP":
                console.log('COMMANDS_SELECT_UP');
                console.log(selectedCommand && selectedCommand - 1)
                const atIndexUp = selectedCommand !== null && selectedCommand - 1;
                return {
                    ...state,
                    selectedCommand: selectCommand(
                        state.filteredCommands,
                        atIndexUp
                    )
                };
            case "COMMANDS_SELECT_DOWN":
                console.log('COMMANDS_SELECT_DOWN');
                const atIndexDown = selectedCommand !== null && selectedCommand + 1;
                return {
                    ...state,
                    selectedCommand: selectCommand(
                        state.filteredCommands,
                        atIndexDown
                    )
                };
            case "COMMANDS_EXECUTE":
                console.log('COMMANDS_EXECUTE');
                if(selectedCommand == null) {
                    return state;
                }

                const commandToExecute = state.filteredCommands[selectedCommand];
                console.log('commandToExecute');
                console.log(commandToExecute);
                if(commandToExecute) {
                    backgroundService.postMessage(
                        commandToExecute
                    );
                }
                return state;
            default:
                return state;
        };
    }, initialState);

    backgroundService.onMessage.addListener((payload) => {
        console.log('receiving message from background');
        dispatch({type: 'COMMANDS_UPDATE', payload });
    })

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    );
}

export default store;
