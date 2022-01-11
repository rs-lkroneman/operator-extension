import React from "react";
import { normalize } from "src/utils";

type OptionListProps = {
  key: number;
  option: string;
  isSelected: boolean;
} & React.ReactElement<"li">;

const Option = (props: OptionListProps) => {
  const { option, isSelected, ...otherProps } = props;
  return (
    <li
      className={`SuggestionList-item${isSelected ? " is-selected" : ""}`}
      {...otherProps}
    >
      {option}
    </li>
  );
};

type SuggestionListProps = {
  selectedValue: string;
  options: string[];
  onOptionClick: (option: string) => void;
};

const SuggestionList = (props: SuggestionListProps) => {
  const { selectedValue, options, onOptionClick, ...otherProps } = props;
  const readableOptions = options.map((item) => ({
    original: item,
    readable: normalize(item),
  }));

  return (
    <ul className="SuggestionList" {...otherProps}>
      {readableOptions.map((option, index) => (
        <Option
          key={index}
          isSelected={selectedValue === option.original}
          option={option.readable}
          onClick={() => onOptionClick(option.original)}
        />
      ))}
    </ul>
  );
};

export default SuggestionList;
