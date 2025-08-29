//src/components/CountryCard.tsx
import type { Country } from '@/store/slices/countriesSlice';
import Image from 'next/image';
import Link from 'next/link';

export default function CountryCard({ country }: { country: Country }) {
  const capital = country.capital?.[0] || '—';
  return (
    <Link
      href={`/countries/${country.cca3}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition border border-gray-100"
    >
      <div className="relative h-40 w-full bg-gray-100">
        <Image
          src={country.flags?.svg || country.flags?.png}
          alt={country.flags?.alt || `${country.name.common} flag`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          {country.name.common}
        </h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Region:</span> {country.region}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Capital:</span> {capital}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Population:</span> {country.population.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
