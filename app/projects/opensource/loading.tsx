export default function Loading() {
    return (
        <main className="animate-pulse p-6">
            {/* Page title skeleton */}
            <div className="mb-4 h-9 w-64 rounded bg-slate-200" />

            {/* Project list skeleton */}
            <ul className="space-y-4">
                {[1, 2, 3].map((item) => (
                    <li key={item} className="space-y-2">
                        <div className="h-6 w-48 rounded bg-slate-200" />
                        <div className="h-4 w-full rounded bg-slate-200" />
                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                    </li>
                ))}
            </ul>
        </main>
    );
}