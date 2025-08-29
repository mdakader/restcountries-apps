//src/app/about/page.tsx
import Image from 'next/image';

export default function About() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <Image src="/welcome.png" alt="Profile Image" fill className="object-cover" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">About Me</h1>
          <p className="text-gray-600 leading-relaxed">
            Hi! I’m a passionate web developer focused on building modern, responsive, and
            user-friendly web applications. I love exploring new technologies, designing beautiful
            interfaces, and improving user experiences.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With experience in React, Next.js, TailwindCSS, and TypeScript, I aim to deliver
            high-quality digital solutions that meet business goals and delight users.
          </p>
          <a
            href="/resume.pdf"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
