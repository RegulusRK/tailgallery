import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ImageSearch = ({ searchText }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  };

  return (
    <div className="max-w-xl mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="flex items-center p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 transition-colors duration-300"
      >
        <Search className="ml-2 text-gray-500 dark:text-gray-400" size={20} />
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Search for images..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Search for images"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors duration-300 ml-2"
          aria-label="Search"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default ImageSearch;