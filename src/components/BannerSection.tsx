//src/components/BannerSection.tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAllCountries } from '@/store/slices/countriesSlice';
import { ChevronLeft, ChevronRight, Eye, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

// Import Swiper React components
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const BannerSection = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.countries);
  const [activeIndex, setActiveIndex] = useState(0);

  // Get all countries sorted by population
  const allCountries = useMemo(() => {
    return [...items].sort((a, b) => b.population - a.population);
  }, [items]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllCountries());
    }
  }, [status, dispatch]);

  if (status === 'loading' || allCountries.length === 0) {
    return (
      <section className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 text-blue-400 mx-auto mb-4 rounded-full border-4 border-blue-400 border-t-transparent"></div>
          <p className="text-xl text-gray-300">Loading countries...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="banner-section w-full h-screen relative overflow-hidden">
      {/* Swiper Slider */}
      <div className="relative w-full h-full">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={'auto'}
          centeredSlides={true}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="countries-swiper w-full h-full"
        >
          {allCountries.map((country, index) => (
            <SwiperSlide key={country.cca3} className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={country.flags.png}
                  alt={country.flags.alt || `${country.name.common} flag`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 w-full">
                  <div className="max-w-2xl px-8">
                    {/* Country Name */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                      {country.name.common}
                    </h1>

                    {/* Country Details */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-white/70 uppercase tracking-wide">Region</p>
                          <p className="text-xl font-semibold">{country.region}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-white/90">
                        <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                          <Users size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-white/70 uppercase tracking-wide">
                            Population
                          </p>
                          <p className="text-xl font-semibold">
                            {country.population.toLocaleString()} people
                          </p>
                        </div>
                      </div>

                      {country.capital && (
                        <div className="text-white/80">
                          <p className="text-sm uppercase tracking-wide mb-1">Capital</p>
                          <p className="text-lg font-medium">{country.capital.join(', ')}</p>
                        </div>
                      )}
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/countries/${country.cca3}`}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 group"
                    >
                      <Eye size={24} className="mr-3 group-hover:scale-110 transition-transform" />
                      View Details
                      <ChevronRight
                        size={20}
                        className="ml-3 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 group">
          <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
        </button>

        <button className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 group">
          <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-6 left-6 z-20 text-white/80 font-medium">
          <span className="text-2xl font-bold">
            {(activeIndex + 1).toString().padStart(2, '0')}
          </span>
          <span className="mx-2">/</span>
          <span>{allCountries.length.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .countries-swiper {
          width: 100%;
          height: 100%;
        }
        .banner-section .countries-swiper {
          padding: 0;
        }

        .countries-swiper .swiper-slide {
          width: 100%;
          height: 100%;
        }

        /* Hide default Swiper buttons */
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default BannerSection;
