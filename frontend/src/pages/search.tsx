import {  useState } from "react";
import { useSearchParams } from "react-router-dom";
// import ProductCard from "../components/productCard";
// import Skeleton from "../components/skeleton";

const Search = () => {
  const searchQuery = useSearchParams()[0];
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState(searchQuery.get("category") || "");
  const [page, setPage] = useState(1);


  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  const addToCartHandler = () => {
    // Add product to cart logic here 
  }

  return (
    <div className="p-8 flex min-h-[calc(100vh-6.5vh)] gap-8">
      {/* Sidebar Filters */}
      <aside className="min-w-[20rem] shadow-md p-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-wide">Filters</h2>

        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Sort</h4>
          <select
            name="sort"
            id="sort"
            title="Sort by price"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-4 border border-gray-400 rounded-lg bg-white"
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Max Price: {maxPrice || ""}</h4>
          <input
          title="Max Price"
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="accent-blue-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Category</h4>
          <select
            name="category"
            id="category"
            title="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 border border-gray-400 rounded-lg bg-white"
          >
            <option value="">ALL</option>
            {/* {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))} */}
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full px-8">
        <h1 className="text-2xl font-bold tracking-wide mb-4">Products</h1>

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-3 mb-6 border-none text-[1.2rem] outline-none"
        />

        {/* {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[calc(100%-10rem)]">
            {searchedData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photos={i.photos}
              />
            ))}
          </div>
        )} */}

        {/* {searchedData && searchedData.totalPage > 1 && (
          <article className="flex items-center justify-center gap-4 mt-8">
            <button
            type="button"
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <span className="font-medium">
              {page} of {searchedData.totalPage}
            </span>
            <button
            type="button"
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </article>
        )} */}
      </main>
    </div>
  );
};

export default Search;
