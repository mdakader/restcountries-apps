//src/components/HeroSection.tsx

'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Build Modern Websites',
    subtitle: 'Creating responsive and high-performance web applications',
    image: '/undraw_hello_ccwj.png',
    cta: '/projects',
    ctaText: 'View Projects',
  },
  {
    title: 'Design Beautiful Interfaces',
    subtitle: 'Crafting user-friendly and visually stunning UI/UX designs',
    image: '/undraw_hello_ccwj.png',
    cta: '/contact',
    ctaText: 'Get in Touch',
  },
  {
    title: 'Bring Ideas to Life',
    subtitle: 'Turning concepts into fully functional web solutions',
    image: '/undraw_hello_ccwj.png',
    cta: '/projects',
    ctaText: 'See My Work',
  },
];

export default function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="hero-section relative w-full h-screen bg-gray-50 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        loop={true}
        speed={1000}
        grabCursor={true}
        className="h-full w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={`slide-${idx}`} className="w-full h-full">
            <div className="h-full flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-16 bg-gray-50">
              <div className="flex-1 space-y-6 text-center md:text-left max-w-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed">{slide.subtitle}</p>
                <Link
                  href={slide.cta}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  {slide.ctaText} <ArrowRight size={16} />
                </Link>
              </div>
              <div className="flex-1 relative w-full max-w-md md:max-w-lg lg:max-w-xl h-64 md:h-96">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-contain rounded-xl"
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="absolute left-4 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group"
        onClick={() => {
          swiperRef.current?.slidePrev();
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-blue-600 group-hover:text-blue-700" />
      </button>

      <button
        className="absolute right-4 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group"
        onClick={() => {
          swiperRef.current?.slideNext();
        }}
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-blue-600 group-hover:text-blue-700" />
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20"></div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10"></div>
    </section>
  );
}
