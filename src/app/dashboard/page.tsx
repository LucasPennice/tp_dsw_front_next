import Link from "next/link";

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto p-6 mb-14 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <Link href="/dashboard/materias">
                    <div className="relative h-52 rounded-2xl border-2 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-blue-500">
                        <div className="absolute inset-0 bg-slate-10 rounded-lg p-6 flex items-center justify-center flex-col ">
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                                Materias
                            </h2>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/profesor">
                    <div className="relative h-52 rounded-2xl border-2 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-blue-500">
                        <div className="absolute inset-0 bg-slate-10 rounded-lg p-6 flex items-center justify-center flex-col ">
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                                Profesores
                            </h2>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/area">
                    <div className="relative h-52 rounded-2xl border-2 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-blue-500">
                        <div className="absolute inset-0 bg-slate-10 rounded-lg p-6 flex items-center justify-center flex-col ">
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">Areas</h2>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/cursado">
                    <div className="relative h-52 rounded-2xl border-2 border-gray-200 overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-blue-500">
                        <div className="absolute inset-0 bg-slate-10 rounded-lg p-6 flex items-center justify-center flex-col ">
                            <h2 className="text-4xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                                Cursados
                            </h2>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
