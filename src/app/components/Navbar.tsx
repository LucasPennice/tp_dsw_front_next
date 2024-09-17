"use client";

import Link from "next/link";

import { useState } from "react";
import { Plus, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const isLog = true;

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-28">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <img src="/assets/logo.png" className="w-36" />
                        </Link>
                    </div>
                    {isLog ? (
                        <div className="flex items-center space-x-4">
                            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 ">
                                        Mi Cuenta
                                        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 mt-4">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Perfil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Configuración</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Cerrar sesión</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <button
                                onClick={() => console.log("Nueva review creada")}
                                className=" hidden md:flex items-center gap-3 px-5 py-3.5 bg-white hover:bg-gray-50 text-gray-700 rounded-full cus-shadow hover:scale-[1.05] transition-all duration-200">
                                <Plus size={20} strokeWidth={2} />
                                <span className="text-md font-medium ">Nueva Review</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" className="flex items-center gap-2 ">
                                Iniciar sesion
                            </Button>
                            <Button variant="default" className="flex items-center gap-2 ">
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
