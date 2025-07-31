"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Menu, X, BookOpen, GraduationCap, User, LogOut } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, logout, isDevelopment } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ExcellenceHub
            </span>
            {isDevelopment && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                DEMO
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/resources"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/pay"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Pricing
            </Link>

            {userData ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/upload"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Upload
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {userData.firstName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                href="/resources"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/pay"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>

              {userData ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/upload"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Upload
                  </Link>
                  <div className="px-3 py-2 text-gray-700 font-medium">
                    Welcome, {userData.firstName}!
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium mx-3 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
