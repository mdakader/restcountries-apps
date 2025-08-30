//src/app/countries/[code]/page.tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCountryByCode } from '@/store/slices/countriesSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Loading Spinner Component
const LoadingSpinner = ({
  size = 'lg',
  text = 'Loading...',
}: {
  size?: 'sm' | 'lg';
  text?: string;
}) => (
  <div className="flex items-center justify-center">
    <svg
      className={`animate-spin text-blue-500 dark:text-blue-400 ${
        size === 'lg' ? 'h-8 w-8' : 'h-5 w-5'
      }`}
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
    <p
      className={`ml-2 text-gray-600 dark:text-gray-300 ${size === 'lg' ? 'text-base' : 'text-sm'}`}
    >
      {text}
    </p>
  </div>
);

// Border Countries Sidebar Component
const BorderCountriesSidebar = ({
  borderCodes,
  borderCountries,
  isLoading,
  currentCountryCode,
}: {
  borderCodes: string[];
  borderCountries: any[];
  isLoading: boolean;
  currentCountryCode: string;
}) => {
  if (!borderCodes || borderCodes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg
            className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Border Countries
        </h3>
        <div className="text-center py-8">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            No Border Countries
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This country doesn&apos;t share borders with any other countries. It might be an island
            nation or have unique geographical features.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg transition-colors duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <svg
            className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Border Countries
          <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {borderCodes.length}
          </span>
        </h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="p-6">
            <LoadingSpinner size="sm" text="Loading border countries..." />
          </div>
        ) : (
          <div className="p-4">
            <div className="space-y-3">
              {borderCodes.map((borderCode) => {
                const borderCountry = borderCountries.find((c) => c.cca3 === borderCode);
                const isCurrentCountry = borderCode === currentCountryCode;

                return (
                  <Link
                    key={borderCode}
                    href={`/countries/${borderCode}`}
                    className={`block p-3 rounded-lg border transition-all duration-200 ${
                      isCurrentCountry
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {borderCountry ? (
                        <>
                          <Image
                            src={borderCountry.flags.png}
                            alt={`${borderCountry.name.common} flag`}
                            width={32}
                            height={24}
                            className="rounded border border-gray-200 dark:border-gray-600 object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium truncate ${
                                isCurrentCountry
                                  ? 'text-blue-700 dark:text-blue-300'
                                  : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              {borderCountry.name.common}
                            </p>
                            <p
                              className={`text-xs truncate ${
                                isCurrentCountry
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
                              {borderCountry.region} • {borderCountry.subregion}
                            </p>
                          </div>
                          {isCurrentCountry && (
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                Current
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-6 bg-gray-200 dark:bg-gray-600 rounded border animate-pulse"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {borderCode}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Loading details...
                            </p>
                          </div>
                        </>
                      )}
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CountryDetailsPage() {
  const { code } = useParams<{ code: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const country = useAppSelector((s) => s.countries.byCode[code]);
  const allCountries = useAppSelector((s) => s.countries.items);
  const status = useAppSelector((s) => s.countries.status);
  const individualStatus = useAppSelector(
    (s) => s.countries.individualCountryStatus[code] || 'idle'
  );
  const error = useAppSelector((s) => s.countries.error);

  const [borderCountriesLoading, setBorderCountriesLoading] = useState(false);

  // Fetch the main country if not available
  useEffect(() => {
    if (!country && code && individualStatus !== 'loading' && individualStatus !== 'succeeded') {
      dispatch(fetchCountryByCode(code));
    }
  }, [country, code, dispatch, individualStatus]);

  // Fetch border countries details
  useEffect(() => {
    if (country?.borders && country.borders.length > 0) {
      const missingBorderCountries = country.borders.filter(
        (borderCode) => !allCountries.find((c) => c.cca3 === borderCode)
      );

      if (missingBorderCountries.length > 0) {
        setBorderCountriesLoading(true);
        // Fetch missing border countries
        Promise.all(
          missingBorderCountries.map((borderCode) => dispatch(fetchCountryByCode(borderCode)))
        ).finally(() => {
          setBorderCountriesLoading(false);
        });
      } else {
        setBorderCountriesLoading(false);
      }
    } else {
      setBorderCountriesLoading(false);
    }
  }, [country?.borders, allCountries, dispatch]);

  const borderCountries = country?.borders
    ? allCountries.filter((c) => country.borders?.includes(c.cca3))
    : [];

  // Determine loading and error states
  const isLoading = individualStatus === 'loading' || (status === 'loading' && !country);
  const hasFailed = individualStatus === 'failed' || (status === 'failed' && !country);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 h-64 md:h-80 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  <div className="p-8 md:w-1/2 space-y-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="space-y-3">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <LoadingSpinner text="Loading country details..." />
          </div>
        </div>
      </main>
    );
  }

  if (hasFailed || (!country && individualStatus === 'succeeded')) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/countries')}
            className="mb-6 inline-flex cursor-pointer items-center px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          >
            ← Back to Countries
          </button>

          <div className="text-center py-12">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.312 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
              Country Not Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'The requested country could not be found.'}
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!country) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <LoadingSpinner text="Loading country details..." />
          </div>
        </div>
      </main>
    );
  }

  const nativeNames = country.name.nativeName
    ? Object.values(country.name.nativeName)
        .map((n: any) => n.common)
        .join(', ')
    : '—';
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c: any) => `${c.name} (${c.symbol})`)
        .join(', ')
    : '—';
  const languages = country.languages ? Object.values(country.languages).join(', ') : '—';

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push('/countries')}
          className="mb-6 inline-flex cursor-pointer items-center px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
        >
          ← Back to Countries
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg overflow-hidden transition-colors duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={country.flags.png}
                    alt={country.flags.alt || `${country.name.common} flag`}
                    width={560}
                    height={400}
                    className="object-cover w-full h-64 md:h-full"
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                    {country.name.common}
                  </h1>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Official Name:
                        </span>{' '}
                        {country.name.official}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Native Name(s):
                        </span>{' '}
                        {nativeNames}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Population:
                        </span>{' '}
                        {country.population.toLocaleString()}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Region:
                        </span>{' '}
                        {country.region}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Subregion:
                        </span>{' '}
                        {country.subregion || '—'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Capital:
                        </span>{' '}
                        {country.capital?.join(', ') || '—'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Currencies:
                        </span>{' '}
                        {currencies}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Languages:
                        </span>{' '}
                        {languages}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar for Border Countries */}
          <div className="lg:col-span-1">
            <BorderCountriesSidebar
              borderCodes={country?.borders || []}
              borderCountries={borderCountries}
              isLoading={borderCountriesLoading}
              currentCountryCode={code}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
