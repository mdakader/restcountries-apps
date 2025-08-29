//src/components/CountriesSection.tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAllCountries } from '@/store/slices/countriesSlice';
import { ChevronRight, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';

// Import Swiper React components
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CountriesSection = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.countries);

  // Get most populated countries
  const mostPopulatedCountries = useMemo(() => {
    return [...items].sort((a, b) => b.population - a.population).slice(0, 20); // Top 20 most populated
  }, [items]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllCountries());
    }
  }, [status, dispatch]);

  if (status === 'loading' || mostPopulatedCountries.length === 0) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Most Populated Countries
            </h2>
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-8 w-8 text-blue-500 dark:text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="ml-2 text-gray-600 dark:text-gray-300">Loading countries...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="countries-section py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Most Populated Countries
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Discover the world's most populous nations and explore their rich cultures, histories,
            and demographics.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="countries-swiper"
          >
            {mostPopulatedCountries.map((country, index) => (
              <SwiperSlide key={country.cca3}>
                <Link href={`/countries/${country.cca3}`} className="group block">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Flag Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={country.flags.png}
                        alt={country.flags.alt || `${country.name.common} flag`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-lg truncate">
                          {country.name.common}
                        </h3>
                        <div className="text-white/90 text-sm font-medium">
                          #{index + 1} Most Populated
                        </div>
                      </div>
                    </div>

                    {/* Country Details */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                        <MapPin size={16} />
                        <span className="text-sm font-medium">{country.region}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                        <Users size={16} />
                        <span className="text-sm font-semibold">
                          {country.population.toLocaleString()} people
                        </span>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <p className="truncate">
                          <span className="font-medium">Capital:</span>{' '}
                          {country.capital?.join(', ') || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 border border-gray-200 dark:border-gray-600">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 border border-gray-200 dark:border-gray-600">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom flex justify-center mt-8 gap-2"></div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/countries"
            className="inline-flex items-center px-8 py-3 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Explore All Countries
            <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgb(209, 213, 219);
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .dark .swiper-pagination-bullet-custom {
          background: rgb(75, 85, 99);
        }

        .swiper-pagination-bullet-active-custom {
          background: rgb(59, 130, 246);
          transform: scale(1.25);
        }

        .dark .swiper-pagination-bullet-active-custom {
          background: rgb(96, 165, 250);
        }

        .swiper-pagination-bullet-custom:hover {
          background: rgb(156, 163, 175);
        }

        .dark .swiper-pagination-bullet-custom:hover {
          background: rgb(107, 114, 128);
        }

        @media (max-width: 640px) {
          .countries-swiper {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default CountriesSection;
