import React from "react";
import PropTypes from "prop-types";

const ImageGallery = ({ images }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((image,i) => (
        <img
          key={i}
          src={image.url}
          alt={image.alt}
          className="rounded-lg w-full object-cover object-center"
        />
      ))}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
