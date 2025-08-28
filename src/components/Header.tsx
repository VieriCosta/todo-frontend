import React from "react";

interface Props {
  search: string;
  onSearch: (value: string) => void;
}

const Header: React.FC<Props> = ({ search, onSearch }) => {
  return (
    <header className="header">
      <h1>Core Todos</h1>
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search todos..."
        className="search-input"
      />
    </header>
  );
};

export default Header;
