"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Svg } from "@/constants/svg";
import Image from "next/image";
import Link from "next/link";
import { Routes } from "@/constants/routes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-stone-700">
                <Image
                  className="absolute -z-10 ml-10 mb-4 -mt-10"
                  src={Svg.behindFigure}
                  alt="Logo"
                  width={120}
                  height={120}
                />
                Jonas Stafset
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 text-xl flex items-baseline justify-end space-x-4">
              <Link
                className="text-black hover:bg-primary-foreground/10 px-3 py-2 rounded-md font-medium"
                href={Routes.POTATOCOUNTDOWN}
              >
                Hjem
              </Link>
              <a
                href="#"
                className="text-black hover:bg-primary-foreground/10 px-3 py-2 rounded-md  font-medium"
              >
                Om
              </a>
              <a
                href="#"
                className="text-black hover:bg-primary-foreground/10 px-3 py-2 rounded-md  font-medium"
              >
                Roadmap
              </a>
              <a
                href="#"
                className="text-black hover:bg-primary-foreground/10 px-3 py-2 rounded-md  font-medium"
              >
                Prosjekter
              </a>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-background inline-flex items-center justify-center p-2 rounded-md text-primary-foreground hover:text-primary hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="text-primary-foreground hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-primary-foreground hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-primary-foreground hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </a>
            <a
              href="#"
              className="text-primary-foreground hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-primary-foreground/10">
            <div className="px-2">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
