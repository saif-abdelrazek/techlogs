import React from "react";
import MostViewedProjects from "@/components/MostViewedProjects";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[90vh] px-4 py-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-blue/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to <span className="text-primary-blue">TechLogs</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Your premier destination for technology insights, development
            tutorials, and industry trends. Join our community of developers and
            tech enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blog"
              className="inline-block bg-primary-blue hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
            >
              Explore Blog
            </a>
            <a
              href="/projects"
              className="inline-block border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-medium py-4 px-8 rounded-xl transition-all duration-300"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* Most Viewed Projects Section */}

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Most Viewed Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              Discover the most popular and innovative projects from our
              community of developers.
            </p>
          </div>
          <MostViewedProjects />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
