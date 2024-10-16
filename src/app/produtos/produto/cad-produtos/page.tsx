"use client";
import { TipoProduto } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroProdutos() {
    const navigate = useRouter();

    const [produto, setProduto] = useState<TipoProduto>({
        id: 0,
        nome: "",
        preco: 0,
        estoque: 0
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: name === "preco" ? parseFloat(value) : value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const cabecalho = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        };

        try {
            const response = await fetch("http://localhost:3000/api/base-produtos", cabecalho);

            if (response.ok) {
                setSuccess(`${produto.nome} cadastrado com sucesso!`);
                setProduto({ id: 0, nome: "", preco: 0, estoque: 0 });
                navigate.push('/produtos');
            } else {
                throw new Error("Erro ao cadastrar produto. Tente novamente.");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="grow p-5 bg-white">
            <h1 className="text-3xl text-center font-bold mb-4 text-pink-600">Cadastro de Produtos</h1>
            <p className="text-xl text-center font-semibold mb-6">Insira um novo produto assim que chega na loja.</p>

            {loading && <div className="text-center">Carregando...</div>}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            {success && <div className="text-green-500 text-center mb-4">{success}</div>}

            <form className="max-w-md mx-auto p-4 border border-pink-300 rounded-md shadow-md" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-1" htmlFor="idnome">Nome</label>
                    <input
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        type="text"
                        name="nome"
                        value={produto.nome}
                        id="idnome"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-1" htmlFor="idpreco">Preço</label>
                    <input
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        step={'0.01'}
                        type="number"
                        name="preco"
                        value={produto.preco}
                        id="idpreco"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-1" htmlFor="idestoque">Estoque</label>
                    <input
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        type="number"
                        name="estoque"
                        id="idestoque"
                        value={produto.estoque}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="bg-pink-600 text-white text-xl p-2 rounded-md transition duration-200 hover:bg-pink-700"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Cadastrando..." : "Cadastrar Produto"}
                </button>
            </form>
        </main>
    );
}
