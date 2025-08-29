//src/app/countries/page.tsx
'use client';

import CountryCard from '@/components/CountryCard';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAllCountries } from '@/store/slices/countriesSlice';
import { useEffect, useMemo, useRef, useState } from 'react';

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
const INITIAL_COUNT = 12;
const INCREMENT_COUNT = 12;

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
      className={`animate-spin text-blue-500 ${size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'}`}
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
      className={`ml-2 text-gray-600 dark:text-gray-400 ${size === 'lg' ? 'text-base' : 'text-sm'}`}
    >
      {text}
    </p>
  </div>
);

// No Results Component
const NoResults = ({
  query,
  region,
  onReset,
}: {
  query: string;
  region: string;
  onReset: () => void;
}) => (
  <div className="text-center py-12">
    <div className="mb-6">
      <svg
        className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No countries found</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
      {query && region
        ? `No countries match "${query}" in the ${region} region.`
        : query
        ? `No countries match "${query}".`
        : region
        ? `No countries found in the ${region} region.`
        : 'No countries match your search criteria.'}
    </p>
    <div className="space-y-2">
      <p className="text-sm text-gray-500 dark:text-gray-400">Try:</p>
      <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <li>• Checking your spelling</li>
        <li>• Using fewer or different keywords</li>
        <li>• Selecting a different region</li>
      </ul>
    </div>
    <button
      onClick={onReset}
      className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Clear all filters
    </button>
  </div>
);

export default function CountriesPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.countries);

  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<string>('');
  const [displayCount, setDisplayCount] = useState(INITIAL_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((c) => {
      const matchesName = q ? c.name.common.toLowerCase().includes(q) : true;
      const matchesRegion = region ? c.region === region : true;
      return matchesName && matchesRegion;
    });
  }, [items, query, region]);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchAllCountries());
  }, [status, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && displayCount < filtered.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setDisplayCount((prev) => prev + INCREMENT_COUNT);
            setIsLoadingMore(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [filtered.length, isLoadingMore, displayCount]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(INITIAL_COUNT);
  }, [query, region]);

  const displayedCountries = useMemo(() => {
    return filtered.slice(0, displayCount);
  }, [filtered, displayCount]);

  const handleResetFilters = () => {
    setQuery('');
    setRegion('');
    setDisplayCount(INITIAL_COUNT);
  };

  const hasSearchCriteria = query.trim() || region;
  const showNoResults = status === 'succeeded' && filtered.length === 0 && hasSearchCriteria;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Explore Countries
            </h1>
            {filtered.length > 0 && status === 'succeeded' && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                {filtered.length} {filtered.length === 1 ? 'country' : 'countries'}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by country name..."
                className="w-full sm:w-80 px-4 py-2 pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full sm:w-56 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <option value="">All regions</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {hasSearchCriteria && (
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                title="Clear filters"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Initial loading state */}
        {status === 'loading' && !items.length && (
          <div className="py-12">
            <LoadingSpinner text="Loading countries..." />
          </div>
        )}

        {/* Error state */}
        {status === 'failed' && (
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
              Failed to load countries
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'Something went wrong while loading the countries.'}
            </p>
            <button
              onClick={() => dispatch(fetchAllCountries())}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* No results state */}
        {showNoResults && <NoResults query={query} region={region} onReset={handleResetFilters} />}

        {/* Countries grid */}
        {displayedCountries.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}

        {/* Load more section */}
        {displayedCountries.length < filtered.length && (
          <div ref={observerRef} className="h-10 mt-8">
            {isLoadingMore && <LoadingSpinner size="sm" text="Loading more countries..." />}
          </div>
        )}
      </div>
    </main>
  );
}
