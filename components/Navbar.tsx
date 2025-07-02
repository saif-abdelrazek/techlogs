"use client";

import ToggleThemeBtn from "./ToggleThemeBtn";
import SignoutBtn from "./SignoutBtn";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSession } from "next-auth/react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navbarVariants: Variants = {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut", // Changed from number array to string
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className="w-full px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo and Brand */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-8"
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex items-center space-x-1">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src="/logo-icon.svg"
                    alt="TechLogs Logo"
                    width={32}
                    height={32}
                    priority
                    className="opacity-90 group-hover:opacity-100 transition-opacity duration-200 logo-image"
                  />
                </motion.div>
                <span className="text-xl font-bold font-heading text-primary-blue">
                  Tech
                </span>
                <span className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                  Logs
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/categories", label: "Categories" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <motion.div
                  key={link.href}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-medium font-sans text-gray-700 dark:text-gray-300 hover:text-primary-blue transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side Actions */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            {/* Theme Toggle Button */}
            <ToggleThemeBtn />

            {/* Authentication Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {status === "loading" ? (
                // Loading state
                <motion.div
                  variants={itemVariants}
                  className="w-8 h-8 border-2 border-primary-blue border-t-transparent rounded-full animate-spin"
                />
              ) : session ? (
                // Authenticated state
                <div className="flex items-center space-x-3">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center space-x-2 text-sm font-sans text-gray-700 dark:text-gray-300"
                  >
                    <span>Welcome,</span>
                    <span className="font-medium font-heading text-primary-blue">
                      {session.user?.name || session.user?.email}
                    </span>
                  </motion.div>
                  <motion.div>
                    <Link
                      href="/dashboard"
                      className="text-sm font-medium font-sans px-4 py-2.5 rounded-xl text-primary-white dark:text-gray-300 hover:text-blue-500 bg-primary-blue transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                </div>
              ) : (
                // Unauthenticated state
                <>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/signin"
                      className="text-sm font-medium font-sans text-gray-700 dark:text-gray-300 hover:text-primary-blue transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Link
                      href="/signup"
                      className="bg-primary-blue hover:bg-blue-700 text-white text-sm font-medium font-sans px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              variants={itemVariants}
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-primary-blue hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-6 relative">
                <motion.span
                  className="absolute block h-0.5 w-6 bg-current"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    top: isMobileMenuOpen ? "10px" : "4px",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute block h-0.5 w-6 bg-current top-2.5"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute block h-0.5 w-6 bg-current"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    top: isMobileMenuOpen ? "10px" : "16px",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
          </motion.div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden bg-white dark:bg-gray-900"
            >
              <div className="border-t border-gray-200 dark:border-gray-700">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                  className="py-2"
                >
                  {/* Navigation Links */}
                  <div className="space-y-1 px-2">
                    {[
                      { href: "/blog", label: "Blog" },
                      { href: "/categories", label: "Categories" },
                      { href: "/about", label: "About" },
                      { href: "/contact", label: "Contact" },
                    ].map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + index * 0.05,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={link.href}
                          className="flex items-center justify-center w-full px-4 py-3 text-base font-medium font-sans text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg active:bg-gray-100 dark:active:bg-gray-700 text-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Auth Section */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                    className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 px-2 space-y-2"
                  >
                    {status === "loading" ? (
                      <div className="flex justify-center py-4">
                        <div className="w-6 h-6 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : session ? (
                      <div className="space-y-3">
                        <div className="text-center text-sm font-sans text-gray-700 dark:text-gray-300 py-2">
                          <span>Welcome,</span>
                          <br />
                          <span className="font-medium font-heading text-primary-blue">
                            {session.user?.name || session.user?.email}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          <Link
                            href="/dashboard"
                            className="flex items-center justify-center w-full px-4 py-3 text-base font-medium font-sans bg-primary-blue text-white hover:bg-blue-700 transition-all duration-200 rounded-lg text-center"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Link
                          href="/signin"
                          className="flex items-center justify-center w-full px-4 py-3 text-base font-medium font-sans text-gray-700 dark:text-gray-300 hover:text-primary-blue hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg active:bg-gray-100 dark:active:bg-gray-700 text-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href="/signup"
                            className="flex items-center justify-center w-full px-4 py-3 bg-primary-blue hover:bg-blue-700 text-white text-base font-medium font-sans rounded-lg transition-all duration-200 text-center active:bg-blue-800 shadow-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Get Started
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
