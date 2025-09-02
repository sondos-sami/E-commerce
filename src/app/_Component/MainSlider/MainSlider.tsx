"use client"
import React from "react";
 import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import image1 from "../../assets/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg"
import image2 from "../../assets/jakob-owens-O_bhy3TnSYU-unsplash.jpg"
import image3 from "../../assets/joan-tran-reEySFadyJQ-unsplash.jpg"

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return (
    <Slider {...settings}>
      <div>
           <Image
      src={image2}
      width={500}
      height={500}
      alt="Picture of the author"
      className="w-full h-[22rem] object-cover "
    />
      </div>
        <div>
           <Image
      src={image1}
      width={500}
      height={500}
      alt="Picture of the author"
      className="w-full h-[22rem] object-cover"
    />
      </div>
        <div>
           <Image
      src={image3}
      width={500}
      height={500}
      alt="Picture of the author"
      className="w-full h-[22rem] object-cover"
    />
      </div>
     </Slider>
  );
}