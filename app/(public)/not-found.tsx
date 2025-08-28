import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Main Content - Single Screen, No Scroll */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>

          {/* 404 Content */}
          <div className="relative">
            {/* Large 404 Number */}
            <div className="text-6xl md:text-8xl font-bold text-primary-blue/20 dark:text-primary-blue/30 mb-4">
              404
            </div>
            
            {/* Tech Icon */}
            <div className="w-24 h-24 mx-auto mb-6">
              <div className="w-full h-full bg-gradient-to-br from-primary-blue/10 to-blue-600/10 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
            </p>

            {/* Action Buttons - Server-side only */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 bg-primary-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Go Home</span>
              </Link>
              
              <Link
                href="/projects"
                className="inline-flex items-center justify-center space-x-2 border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Browse Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}