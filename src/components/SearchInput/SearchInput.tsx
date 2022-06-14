import React, { useEffect } from "react";

const SearchInput = (props) => {
  const ref = React.createRef();

  useEffect(() => {
    const { current } = ref;
    if (current) {
      current.focus();
    }
  });

  return (
    <input
      {...props}
      className="SearchInput"
      data-testid="search_input"
      ref={ref}
    />
  );
};

export default SearchInput;
