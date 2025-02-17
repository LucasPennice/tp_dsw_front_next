"use client";

import Link from "next/link";

export default function Component() {
    const current_year = new Date().getFullYear();
        return (
        <footer className="bg-gray-100 text-gray-600 py-8 mt-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="mb-2 mt-2 sm:mb-0">
                        <Link href="/" className="flex items-center">
                            <img src="/assets/logo.png" className="w-36" />
                        </Link>
                    </div>
                    <nav className="mb-2 mt-2 sm:mb-0">
                        <ul className="flex space-x-4">
                            <li>
                                <a href="#" className="hover:text-gray-900 transition-colors duration-300">
                                    Home
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className="hover:text-gray-900 transition-colors duration-300">
                                    Crear Una Review
                                </a>
                            </li> */}
                        </ul>
                    </nav>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                    <p className="text-sm">&copy; {current_year} Pacienzia - Pennice - Genovese Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
