//src/components/Footer.tsx
'use client';

import { Github, Globe, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 light:bg-gray-100 text-gray-300 dark:text-gray-300 light:text-gray-600 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-semibold mb-4 transition-colors duration-300">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Globe size={28} />
                Countries
              </Link>
            </h3>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 transition-colors duration-300">
              Building modern web applications and creative digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-semibold mb-4 transition-colors duration-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors duration-200"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors duration-200"
                >
                  Countries
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white dark:text-white light:text-gray-900 text-lg font-semibold mb-4 transition-colors duration-300">
              Connect
            </h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </Link>
              <Link
                href="mailto:example@mail.com"
                className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={24} />
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700 dark:border-gray-600 light:border-gray-300 transition-colors duration-300" />

        <p className="text-center text-gray-500 dark:text-gray-400 light:text-gray-500 text-sm transition-colors duration-300">
          &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
