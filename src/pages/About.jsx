import { Link } from 'react-router-dom';

export const About = () => {
    return (
        <section className="container w-full flex flex-col gap-10 text-white px-6 py-8">
            <div className='flex flex-col'>
                <nav className="container w-full text-lg text-gray-400">
                    <Link to="/" className="hover:text-gray-200">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-200">About</span>
                </nav>

                <div className="container w-full pt-8">
                    <h1 className="text-4xl font-semibold mb-2">About Silksong Shop</h1>
                </div>
            </div>
            
            <header className="flex flex-col gap-3">
                <h1 className="text-4xl font-semibold leading-tight">Forged for wanderers of Hallownest</h1>
                <p className="max-w-3xl text-gray-200">
                    Silksong Shop is a fan-made showcase of artifacts, created with love for the world of Hollow Knight. We collect
                    items you want to keep close: from charms to capes, inspired by the journey of the Knight and Hornet.
                </p>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
                {[ 
                    { title: 'Fan-made & curated', body: 'Every item is a reference to Hallownest, handpicked with care.' },
                    { title: 'Limited drops', body: 'Small batches to keep each piece special and unique.' },
                    { title: 'Worldwide shipping', body: 'We ship worldwide, packing carefully so your artifact arrives safe.' },
                ].map((item) => (
                    <article key={item.title} className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-200">{item.body}</p>
                    </article>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <article className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">Fan Project Story</h2>
                    <p className="text-gray-200">
                        We started with a small collection of figures and charms to preserve the atmosphere of silence and echoes
                        that Hollow Knight brings. The catalog has grown — now it includes merch, collectibles, and fan art.
                    </p>
                    <p className="text-gray-200">
                        Our goal is simple: give the community a place where each item reminds of the adventure beneath Hallownest.
                    </p>
                </article>

                <article className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">Quality Approach</h2>
                    <ul className="flex flex-col gap-2 text-gray-200 list-disc list-inside">
                        <li>Dense-textured materials to withstand the long journey.</li>
                        <li>Print and paint quality control to keep details sharp.</li>
                        <li>Soft-insert packaging — protection from impact during shipping.</li>
                    </ul>
                </article>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <article className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Short Timeline</h2>
                    <div className="flex flex-col gap-3 text-gray-200">
                        <div>
                            <p className="text-sm text-gray-400">2023</p>
                            <p>First figures and posters for community friends.</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">2024</p>
                            <p>Catalog expansion: charms, capes, art books.</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">2025</p>
                            <p>Launch of Silksong Shop as a fan artifacts showcase.</p>
                        </div>
                    </div>
                </article>

                <article className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">Principles</h2>
                    <ul className="flex flex-col gap-2 text-gray-200 list-disc list-inside">
                        <li>We put the Hollow Knight atmosphere first.</li>
                        <li>Honestly mark the project as non-commercial and fan-made.</li>
                        <li>Support artists and authors of original works.</li>
                    </ul>
                </article>
            </div>

            <article className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Ready to explore Hallownest?</h3>
                    <p className="text-gray-200 max-w-xl">Check out the catalog: merch, collectibles, and artifacts that bring you to the silence of the depths.</p>
                </div>
                <Link
                    to="/catalog"
                    className="px-5 py-2 rounded-[10px] border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-center"
                >
                    Open Catalog
                </Link>
            </article>
        </section>
    )
}