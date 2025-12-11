import Link from 'next/link';

export const metadata = {
    title: 'Under Construction',
};

export default function Page() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
            <div className="max-w-3xl mx-auto text-center p-8">
                <div className="mx-auto w-40 h-40 rounded-full bg-white/10 flex items-center justify-center mb-6 shadow-xl">
                    {/* Simple logo: gear + rocket style */}
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                    >
                        <path d="M12 2v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 20v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.93 4.93l1.41 1.41" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.66 17.66l1.41 1.41" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 12h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.93 19.07l1.41-1.41" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.66 6.34l1.41-1.41" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 15l6-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 15l1-1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold mb-12">Coming Soon</h1>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/#services"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold shadow-md hover:opacity-95"
                    >
                        View Other Services
                    </Link>

                    <a
                        href="mailto:planitt.official@gmail.com"
                        className="inline-flex items-center justify-center px-6 py-3 border border-white/30 rounded-lg text-white/95 hover:underline"
                    >
                        Contact Us
                    </a>
                </div>

                <p className="mt-6 text-sm text-white/80">Estimated launch: Q1 2026</p>
            </div>
        </main>
    );
}
