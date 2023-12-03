import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalImages: 0,
    isLoadMore: false,
    isLoading: false,
    url: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true, isSearchDisabled: true });
      findImages(query, page)
        .then(({ hits: photos, totalHits: total_images }) => {
          if (!photos.length) {
            return Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.',
              paramsForNotify
            );
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...photos],
            isLoadMore: page < Math.ceil(total_images / 12),
          }));
        })
        .catch(error => {
          Notify.failure(
            'Oops! Something went wrong! Try reloading the page or make another choice!',
            paramsForNotify
          );
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }

    this.setState({ query, images: [], page: 1 });
  };

  openModal = url => {
    this.setState({ url });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoadMore, isLoading, url } = this.state;

    return (
      <StyledApp>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery images={images} openModal={this.openModal} />
        {isLoadMore && (
          <LoadMoreBtn onClick={this.handleLoadMore}>Load more</LoadMoreBtn>
        )}
        {url && <Modal closeModal={this.openModal} url={url} />}
      </StyledApp>
    );
  }
}
