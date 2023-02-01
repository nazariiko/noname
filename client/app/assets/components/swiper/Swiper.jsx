import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import BannerSlide from '../bannerSlide/BannerSlide';
import 'swiper/css';
import 'swiper/css/pagination';

export default ({slides}) => {
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true ,currentClass:'test '}}
    >
    {slides.reverse().map((slide,index) => {
        return <SwiperSlide key={index}><BannerSlide slide={slide}/></SwiperSlide>
    })}
    </Swiper>
  );
};