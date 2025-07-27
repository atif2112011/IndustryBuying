import SearchLogo from "../assets/icons/search-line.svg"
function SearchBar({ searchTerm, setSearchTerm,placeholder,handleSearch }) {
  return (
    <div className="p-2  flex flex-row md:min-w-[400px] items-center justify-between border-2 border-gray-300 rounded-sm bg-white flex-1">
      <input className="text-xs md:!text-sm text-gray-700 flex-1 align-center border-none outline-none "
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>
        <img src={SearchLogo} alt="searchBtn" height={16} width={16}/>
      </button>
    </div>
  );
}

export default SearchBar;