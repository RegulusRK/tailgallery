import React from 'react';

export const ImageCard = ({ image }) => {

    const tags = image.tags.split(',').slice(0, 3);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={image.webformatURL} alt='' className="w-full" />
      <div className='px-6 py-4'>
        <div className='font-bold text-purple-500 text-xl mb-2'>
          Photo by {image.user}
        </div>
        <ul>
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className='px-6 pt-4 pb-2'>
        {tags.map((tag, index) => (
         <span key={index} className='inline-block bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mr-2 mb-2'>
            #{tag}
        </span>
        ))}
      </div>
    </div>
  )
}

export default ImageCard;
