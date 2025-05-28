import React, { useState, useEffect } from 'react';
import { SunMoon } from 'lucide-react';
import ImageGallery from './components/ImageGallery';
import ImageSearch from './components/ImageSearch';
import Pagination from './components/Pagination';
import { ThemeProvider } from './context/ThemeContext';
import ThemeContext from './context/ThemeContext';

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Pixabay API key - in production, this should be in an environment variable
  const imagesPerPage = 12;

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${encodeURIComponent(term)}&image_type=photo&pretty=true&page=${currentPage}&per_page=${imagesPerPage}`
        );
        const data = await response.json();
        setImages(data.hits);
        setTotalPages(Math.ceil(data.totalHits / imagesPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [term, currentPage]);

  const handleSearchChange = (searchText) => {
    setTerm(searchText);
    setCurrentPage(1);
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-100">
        <header className="py-6 px-4 shadow-sm bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              TailGallery
            </h1>
            <ThemeToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <ImageSearch searchText={handleSearchChange} />

          {isLoading ? (
            <LoadingState />
          ) : images.length === 0 ? (
            <NoImagesFound term={term} />
          ) : (
            <>
              <ImageGallery images={images} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      <SunMoon size={24} />
    </button>
  );
};

const LoadingState = () => (
  <div className="flex justify-center items-center h-64 mt-16">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-t-teal-500 border-gray-200 rounded-full animate-spin"></div>
      <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">Loading images...</p>
    </div>
  </div>
);


const NoImagesFound = ({ term }) => (
  <div className="text-center mt-16 animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">No Images Found</h2>
    <p className="text-xl text-gray-600 dark:text-gray-400">
      {term ? `No images matching "${term}"` : 'Try searching for something else'}
    </p>
  </div>
);

export default App;