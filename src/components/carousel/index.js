import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
  return (
    <Carousel showThumbs={true} autoPlay infiniteLoop>
      <div>
        <img src="/assets/images/image3.jpeg" alt="Image 1" />
      </div>
      <div>
        <img src="/assets/images/image4.jpeg" alt="Image 2" />
      </div>

      <div>
        <img src="/assets/images/image6.jpeg" alt="Image 3" />
      </div>
      <div>
        <img src="/assets/images/image9.jpeg" alt="Image 3" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
