import Link from 'next/link';

export default function ProjectsLayout({ children, 

}: { children: React.ReactNode;

}) {
    return (
        <section className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Project Section</h2>

            <nav className="mb-6 flex gap-4">
                <Link href="/projects">Overview</Link> | {' '}
                <Link href="/projects/opensource">Open Source</Link> | {' '}
                <Link href="/projects/school">School</Link>
            </nav>
            { children }
        </section>
    );
}