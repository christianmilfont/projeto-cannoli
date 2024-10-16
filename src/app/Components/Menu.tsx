import Link from "next/link";

export default function Menu() {
    return (
        <nav className="bg-white p-4 shadow-md border rounded-es-3xl">
            <ul className="flex gap-6">
                <li>
                    <Link href="/" className="text-pink-500 hover:text-pink-700 transition-colors">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/produtos" className="text-pink-500 hover:text-pink-700 transition-colors">
                        Produtos
                    </Link>
                </li>
                <li>
                    <Link href="/produtos/cad-produtos" className="text-pink-500 hover:text-pink-700 transition-colors">
                        Cadastro de Produtos
                    </Link>
                </li>
            </ul>
        </nav>
    );
}