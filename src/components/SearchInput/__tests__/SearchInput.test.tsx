import React from "react";
import { render } from "@testing-library/react";

import SearchInput from "src/components/SearchInput";

describe("SearchInput", () => {
  it("focuses on render", () => {
    const result = render(<SearchInput />);

    const searchElement = result.getByTestId("search_input");

    expect(document.activeElement).toBe(searchElement);
  });
});
