import Link from "next/link";

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto p-6 mb-14 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <Link href="/CRUD/materias">
                    <div className="relative h-72 rounded-2xl overflow-hidden group transition-transform duration-300 transform hover:scale-105">
                        <div className="absolute inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center">
                            <h2 className="text-3xl font-bold text-white">Materias</h2>
                        </div>
                    </div>
                </Link>
                <Link href="/CRUD/profesor">
                    <div className="relative h-72 rounded-2xl overflow-hidden group transition-transform duration-300 transform hover:scale-105">
                        <div className="absolute inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center">
                            <h2 className="text-3xl font-bold text-white">Profesores</h2>
                        </div>
                    </div>
                </Link>
                <Link href="/CRUD/area">
                    <div className="relative h-72 rounded-2xl overflow-hidden group transition-transform duration-300 transform hover:scale-105">
                        <div className="absolute inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center">
                            <h2 className="text-3xl font-bold text-white">Areas</h2>
                        </div>
                    </div>
                </Link>
                <Link href="/CRUD/cursado">
                    <div className="relative h-72 rounded-2xl overflow-hidden group transition-transform duration-300 transform hover:scale-105">
                        <div className="absolute inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center">
                            <h2 className="text-3xl font-bold text-white">Cursados</h2>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
