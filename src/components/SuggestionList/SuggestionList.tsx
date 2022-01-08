import React from "react";
import { normalize } from "../../utils";

type OptionListProps = {
  key: number;
  option: string;
  isSelected: boolean;
};

const Option = (props: OptionListProps) => {
  const { option, isSelected } = props;
  return (
    <li className={`SuggestionList__item${isSelected ? " is-selected" : ""}`}>
      {option}
    </li>
  );
};

type SuggestionListProps = {
  selectedValue: string;
  options: string[];
};

const SuggestionList = (props: SuggestionListProps) => {
  const { selectedValue, options, ...otherProps } = props;
  const readableOptions = options.map(normalize);

  return (
    <ul className="SuggestionList" {...otherProps}>
      {readableOptions.map((option, index) => (
        <Option
          key={index}
          isSelected={normalize(selectedValue) === option}
          option={option}
        />
      ))}
    </ul>
  );
};

export default SuggestionList;
