import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos";

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  function handlePlusClick() {
    const link = prompt("Enter a URL:");
    if (link) {
      window.location.href = link;
    }
  }

  return (
    <div>
      <nav class="navbar bg-primary" data-bs-theme="bg-primary">
        <nav class="navbar navbar-expand-lg">
          <div>
            <a class="navbar-brand" href="#">  i-hub</a>
          </div>
        </nav>
      </nav>
      <br/><br/>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <div className="container">
        <button className="plus-button" onClick={handlePlusClick}>
          +
        </button>
      </div>
    </div>
  );
}
render(<App />, document.getElementById("app"));
