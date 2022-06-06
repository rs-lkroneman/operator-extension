import React, { useEffect } from "react";

const SearchInput = (props) => {
  const ref = React.createRef();

  useEffect(() => {
    const { current } = ref;
    if (current) {
      current.focus();
    }
  });

  return <input {...props} className="SearchInput" ref={ref} />;
};

export default SearchInput;
