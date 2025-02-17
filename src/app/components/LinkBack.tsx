"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LinkBack({route}: {route: string}){
    return (
        <Link
            href={route}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mt-3  duration-200 mb-6">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver Atrás
        </Link>
    );
}
