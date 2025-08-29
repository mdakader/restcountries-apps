//src/components/WelcomeSection.tsx

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function WelcomeSection() {
  return (
    <section className="relative bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Welcome to My Portfolio
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
            I build modern, responsive, and user-friendly web applications using the latest
            technologies. Let’s create something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition"
            >
              View Projects
            </Link>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="flex-1 relative w-full max-w-md md:max-w-lg lg:max-w-xl">
          <Image
            src="/undraw_game-day_m63l.png"
            alt="Hero Illustration"
            width={600}
            height={600}
            className="object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10"></div>
    </section>
  );
}
