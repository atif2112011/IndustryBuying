import SearchLogo from "../assets/icons/search-line.svg"
function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="p-2  flex flex-row items-center justify-between border-2 border-gray-300 rounded-sm">
      <input className="text-sm text-gray-700 w-100 align-center border-none outline-none"
        type="text"
        placeholder="Search products by title, sku, category, or brand"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button>
        <img src={SearchLogo} alt="searchBtn" height={16} width={16}/>
        </button>
    </div>
  );
}

export default SearchBar;