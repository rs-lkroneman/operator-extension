import React from "react";
import { fireEvent, render } from "@testing-library/react";

import SuggestionList from "../SuggestionList";

const options = [
  {
    description: "First Option",
    name: "Option One",
    shortcut: "",
    id: "OPTION_ONE",
  },
  {
    description: "Second String Option",
    name: "Option Two",
    shortcut: "",
    id: "OPTION_TWO",
  },
];

describe("SuggestionList", () => {
  describe("Options", () => {
    it("Converts the name to lowercase renders it as the display value", () => {
      const onOptionClick = jest.fn();
      const result = render(
        <SuggestionList
          selectedValue=""
          options={options}
          onOptionClick={onOptionClick}
        />
      );

      expect(result.container).toHaveTextContent("option one");
    });

    it("onOptionClick is fired with the option value when an option is clicked", () => {
      const onOptionClick = jest.fn();
      const result = render(
        <SuggestionList
          selectedValue=""
          options={options}
          onOptionClick={onOptionClick}
        />
      );

      const optionOneElement = result.getByText(/option one/);

      fireEvent.click(optionOneElement);

      expect(onOptionClick).toHaveBeenCalledWith("OPTION_ONE");
    });
  });
});
