import React, { useEffect, useState } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { StyledApp } from 'components/AppStyle';
import { LoadMoreBtn } from 'components/Button/Button';
import { findImages } from 'components/Api/pixabay';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const paramsForNotify = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};
export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!query) {
        return;
      }

      try {
        setIsLoading(true);
        const photos = await findImages(query, page);

        if (!photos.hits.length === 0) {
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
            paramsForNotify
          );
        }
        setImages(prevImages => [...prevImages, ...photos.hits]);
        setIsLoadMore(page < Math.ceil(photos.totalHits / 12));
      } catch (error) {
        Notify.failure(
          'Oops! Something went wrong! Try reloading the page or make another choice!',
          paramsForNotify
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const openModal = url => {
    setUrl(url);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <StyledApp>
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery images={images} openModal={openModal} />
      {isLoadMore && (
        <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
      )}
      {url && <Modal closeModal={openModal} url={url} />}
    </StyledApp>
  );
};
