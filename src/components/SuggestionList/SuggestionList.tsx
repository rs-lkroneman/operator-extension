import React from "react";
import { normalize } from "src/utils";
import { CommandOption } from "src/store/commandReducer";

type OptionListProps = {
  key: number;
  option: string;
  isSelected: boolean;
  shortcut: string;
} & React.ReactElement<"li">;

const Option = (props: OptionListProps) => {
  const { option, isSelected, shortcut, ...otherProps } = props;
  return (
    <li
      className={`SuggestionList-item${isSelected ? " is-selected" : ""}`}
      {...otherProps}
    >
      <span className="SuggestionList-text">{option}</span>
      <span className="SuggestionList-shortcut">{shortcut}</span>
    </li>
  );
};

type SuggestionListProps = {
  selectedValue: string;
  options: CommandOption[];
  onOptionClick: (option: string) => void;
};

const SuggestionList = (props: SuggestionListProps) => {
  const { selectedValue, options, onOptionClick, ...otherProps } = props;
  const readableOptions = options.map((item) => ({
    original: item.id,
    readable: normalize(item.id),
    shortcut: item.shortcut,
  }));

  return (
    <ul className="SuggestionList" {...otherProps}>
      {readableOptions.map((option, index) => (
        <Option
          key={index}
          isSelected={selectedValue === option.original}
          option={option.readable}
          shortcut={option.shortcut}
          onClick={() => onOptionClick(option.original)}
        />
      ))}
    </ul>
  );
};

export default SuggestionList;
