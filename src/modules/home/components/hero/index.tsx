// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import "../../../../styles/SlideShow.module.css"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/swiper-bundle.css" // Ensure correct path to CSS file
import "swiper/css/pagination"
import "swiper/css/navigation"

interface Slider {
  id: number
  image: string
}

const sliders: Slider[] = [
  { id: 1, image: "public/bg-img/slider2_20240715032150714.jpg" },
  { id: 2, image: "public/bg-img/slider3_20240715032150854.jpg" },
  { id: 3, image: "public/bg-img/slider4_20240715032150854" },
]

export default function Hero() {
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
      {sliders.map((slider) => {
        return (
          <SwiperSlide key={slider.id}>
            <Image
              src={slider.image}
              layout="responsive"
              width={1144}
              height={400}
              alt="Slide image"
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
