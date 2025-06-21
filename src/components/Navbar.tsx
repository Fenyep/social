"use client"

import { useState } from "react";
import SearchBar from "./SearchBar";

export default function NavBar () {

          const [searchTerm, setSearchTerm] = useState('');

    return (
        
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Blog Explorer
                </h1>
                <p className="text-gray-600 mt-1">Discover amazing stories and insights</p>
              </div>
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
          </div>
        </header>
    );
}