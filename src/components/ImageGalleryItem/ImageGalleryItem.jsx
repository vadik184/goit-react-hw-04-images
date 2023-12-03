import React from 'react';
import {
  GalleryItemstyled,
  GalleryItemImg,
} from 'components/ImageGalleryItem/ImageGalleryItemStyle';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <GalleryItemstyled>
      <GalleryItemImg
        src={image.webformatURL}
        alt={image.tags}
        id={image.id}
        onClick={() => onClick(image.webformatURL)}
      />
    </GalleryItemstyled>
  );
};
