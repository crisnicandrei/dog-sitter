import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div>
        <img src="/assets/images/image1.jpeg" alt="Image 1" />
        <p className="legend">Image 1</p>
      </div>
      {/* <div>
        <img src="/images/image2.jpg" alt="Image 2" />
        <p className="legend">Image 2</p>
      </div>
      <div>
        <img src="/images/image3.jpg" alt="Image 3" />
        <p className="legend">Image 3</p> */}
      {/* </div> */}
    </Carousel>
  );
};

export default ImageCarousel;
