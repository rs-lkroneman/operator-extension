import React from 'react';

const SuggestionList = ({ selectedValue, options, ...props }) => {
    const readableOptions = options.map(option => option.split('_').join(' '))
    const Option = ({ option }) => (
        <li className={`SuggestionList__item${selectedValue === option ? ' is-selected' : ''}`} >{option}</li>
    );

    return (
        <ul class="SuggestionList">
            {readableOptions.map(option => <Option option={option} />)}
        </ul>
    );
};

export default SuggestionList;