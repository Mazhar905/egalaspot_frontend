// Import Swiper React components
"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import TextButton from "../../../common/components/button"
import "../../../../styles/SlideShow.module.css"
import image1 from "../../../../../public/bg-img/slider2_20240715032150714.jpg"
import image2 from "../../../../../public/bg-img/slider3_20240715032150854.jpg"
import image3 from "../../../../../public/bg-img/slider4_20240715032151026.jpg"

import { Autoplay, Pagination, Navigation } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/swiper-bundle.css" // Ensure correct path to CSS file
import "swiper/css/pagination"
import "swiper/css/navigation"

const sliders = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
]

const SlideShow = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        type: "fraction",
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper cursor-pointer"
    >
      {sliders.map((slider) => (
        <SwiperSlide key={slider.id}>
          <div className="lg:block">
            <Image
              layout="responsive"
              src={slider.image}
              width={1144}
              height={400}
              alt={"some name"}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SlideShow
