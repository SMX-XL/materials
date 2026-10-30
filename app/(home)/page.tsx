import Link from 'next/link';

const units = [
    {
        id: 'UD1',
        title: 'Introducció a les xarxes locals',
        href: '/docs/ud1',
    },
    {
        id: 'UD2',
        title: 'Arquitectura de xarxes',
        href: '/docs/ud2',
    },
    {
        id: 'UD3',
        title: 'Elements d’una xarxa local',
        href: '/docs/ud3',
    },
    {
        id: 'UD4',
        title: 'Seguretat i protecció mediambiental',
        href: '/docs/ud4',
    },
    {
        id: 'UD5',
        title: 'Instal·lació física de la xarxa: cablatge estructurat',
        href: '/docs/ud5',
    },
    {
        id: 'UD6',
        title: 'Pila de protocols TCP/IP',
        href: '/docs/ud6',
    },
    {
        id: 'UD7',
        title: 'Capa Internet: adreces IP i protocols d’encaminament',
        href: '/docs/ud7',
    },
];

export default function HomePage() {
    return (
        <main className="min-h-screen px-6 py-20">
            <div className="mx-auto max-w-5xl">

                {/* Hero */}
                <section className="text-center">
                    <p className="mb-4 text-sm font-medium uppercase tracking-wider text-fd-muted-foreground">
                        0225 · Xarxes Locals · SMX
                    </p>

                    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                        Materials de Xarxes Locals
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg leading-8 text-fd-muted-foreground">
                        Materials didàctics i documentació per al mòdul de
                        Xarxes Locals del cicle formatiu de grau mitjà de
                        Sistemes Microinformàtics i Xarxes.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/docs"
                            className="rounded-lg bg-fd-primary px-5 py-3 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
                        >
                            Començar
                        </Link>

                        <Link
                            href="https://github.com/SMX-XL/materials"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border px-5 py-3 font-medium transition-colors hover:bg-fd-accent"
                        >
                            GitHub
                        </Link>
                    </div>
                </section>

                <section className="mt-24">
                    <div className="mb-8">
                        <p className="text-sm font-medium text-fd-muted-foreground">
                            CONTINGUTS
                        </p>

                        <h2 className="mt-2 text-2xl font-bold">
                            Unitats didàctiques
                        </h2>

                        <p className="mt-2 text-fd-muted-foreground">
                            Consulta els continguts del mòdul de manera
                            estructurada.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {units.map((unit) => (
                            <Link
                                key={unit.id}
                                href={unit.href}
                                className="group rounded-xl border p-5 transition-colors hover:bg-fd-accent"
                            >
                                <span className="text-sm font-semibold text-fd-muted-foreground">
                                    {unit.id}
                                </span>

                                <h3 className="mt-2 font-medium group-hover:underline">
                                    {unit.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mt-24 grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border p-6">
                        <p className="text-sm font-medium text-fd-muted-foreground">
                            SOBRE EL PROJECTE
                        </p>

                        <h2 className="mt-2 text-xl font-bold">
                            Una documentació més accessible
                        </h2>

                        <p className="mt-3 leading-7 text-fd-muted-foreground">
                            El projecte modernitza la documentació dels
                            materials i la presenta en un entorn web
                            estructurat, navegable i cercable.
                        </p>
                    </div>
                </section>

                <section className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border p-5">
                        <h3 className="font-semibold">
                            Estructurat
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                            Els continguts estan organitzats per unitats
                            didàctiques.
                        </p>
                    </div>

                    <div className="rounded-xl border p-5">
                        <h3 className="font-semibold">
                            Cercable
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                            Troba ràpidament la informació que necessites
                            dins de la documentació.
                        </p>
                    </div>

                    <div className="rounded-xl border p-5">
                        <h3 className="font-semibold">
                            Web
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                            Accedeix als materials des de qualsevol
                            dispositiu amb un navegador.
                        </p>
                    </div>
                </section>

                <section className="mt-24 rounded-xl border p-6 md:p-8">
                    <p className="text-sm font-medium text-fd-muted-foreground">
                        CRÈDITS
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                        Autoria i contribucions
                    </h2>

                    <div className="mt-6 grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold">
                                Material original
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                                Carlos Alonso Martínez
                                <br />
                                Escola Pia de Mataró
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Documentació i modernització
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                                Artur Subiña
                                <br />
                                Migració, estructura web i modernització de
                                la documentació.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mt-8 rounded-xl border p-6 md:p-8">
                    <p className="text-sm font-medium text-fd-muted-foreground">
                        LLICÈNCIA
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                        CC BY-NC-SA 4.0
                    </h2>

                    <p className="mt-3 max-w-3xl leading-7 text-fd-muted-foreground">
                        Els materials es distribueixen sota la llicència
                        Creative Commons Attribution-NonCommercial-ShareAlike
                        4.0 International.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <span className="rounded-md border px-3 py-1.5 text-sm">
                            Atribució
                        </span>

                        <span className="rounded-md border px-3 py-1.5 text-sm">
                            No comercial
                        </span>

                        <span className="rounded-md border px-3 py-1.5 text-sm">
                            Compartir igual
                        </span>
                    </div>

                    <Link
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block text-sm font-medium underline underline-offset-4"
                    >
                        Veure la llicència completa →
                    </Link>
                </section>

                <footer className="mt-20 border-t pt-8 text-center text-sm text-fd-muted-foreground">
                    <p>
                        Materials de Xarxes Locals · SMX
                    </p>

                    <p className="mt-2">
                        Material original de Carlos Alonso Martínez i Escola
                        Pia de Mataró.
                    </p>

                    <p className="mt-1">
                        Documentació i modernització per Artur Subiña.
                    </p>

                    <div className="mt-4 flex justify-center gap-4">
                        <Link
                            href="https://github.com/SMX-XL/materials"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4"
                        >
                            GitHub
                        </Link>

                        <Link
                            href="/docs"
                            className="underline underline-offset-4"
                        >
                            Documentació
                        </Link>

                        <Link
                            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4"
                        >
                            Llicència
                        </Link>
                    </div>

                </footer>
            </div>
        </main>
    );
}
