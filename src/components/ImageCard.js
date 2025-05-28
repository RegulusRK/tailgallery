import React from 'react';

const ImageCard = ({ image }) => {
  const tags = image.tags.split(',').map(tag => tag.trim()).slice(0, 3);
  
  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl dark:shadow-gray-800 bg-white dark:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] h-full flex flex-col">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={image.webformatURL} 
          alt={`Image by ${image.user}`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex items-center mb-3">
          {image.userImageURL ? (
            <img 
              src={image.userImageURL} 
              alt={image.user}
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-2">
              <span className="text-white font-bold">{image.user.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {image.user}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex justify-between">
            <span>👁️ Views</span>
            <span className="font-semibold">{image.views.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>⬇️ Downloads</span>
            <span className="font-semibold">{image.downloads.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>❤️ Likes</span>
            <span className="font-semibold">{image.likes.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4 pt-2 mt-auto">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 transition-colors duration-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;