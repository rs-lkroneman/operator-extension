import React from 'react';

const SuggestionList = ({ selectedValue, options, ...props }) => {
    const normalize = (item) => item.split('_').join(' ');
    const readableOptions = options.map(normalize);
    const Option = ({ option }) => (
        <li className={`SuggestionList__item${normalize(selectedValue) === option ? ' is-selected' : ''}`} >{option}</li>
    );

debugger;
    return (
        <ul className="SuggestionList">
            {readableOptions.map(option => <Option option={option} key={option} />)}
        </ul>
    );
};

export default SuggestionList;