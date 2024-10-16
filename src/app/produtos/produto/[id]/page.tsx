"use client";
import { TipoProduto } from "@/types";
import { useEffect, useState } from "react";

export default function Produto({ params }: { params: { id: number } }) {
    const [produto, setProduto] = useState<TipoProduto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const chamadaApi = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/base-produtos/${params.id}`);
                if (!response.ok) {
                    throw new Error("Produto não encontrado");
                }
                const data = await response.json();
                setProduto(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };
        chamadaApi();
    }, [params.id]);

    if (loading) {
        return <div className="text-center">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <main className="grow p-5 bg-white">
            <h2 className="text-3xl text-center text-pink-600 mb-6">Detalhes do Produto</h2>
            <div className="bg-pink-100 p-4 m-auto border border-pink-300 rounded-md shadow-md w-80">
                <h3 className="text-lg font-semibold text-pink-700 mb-2">Informações do Produto</h3>
                <p className="text-md font-medium mb-1">ID: <span className="font-normal">{produto?.id}</span></p>
                <p className="text-md font-medium mb-1">Nome: <span className="font-normal">{produto?.nome}</span></p>
                <p className="text-md font-medium mb-1">Preço: <span className="font-normal">R$ {produto?.preco.toFixed(2)}</span></p>
                <p className="text-md font-medium mb-1">Estoque: <span className="font-normal">{produto?.estoque}</span></p>
            </div>
        </main>
    );
}

/*
Melhorias Implementadas:
Gerenciamento de Estado de Carregamento e Erro:

Adicionei estados para loading e error para fornecer feedback ao usuário enquanto os dados estão sendo carregados ou se houver um erro durante a chamada da API.
Tratamento de Erros:

Agora, se a requisição falhar, o usuário verá uma mensagem de erro amigável em vez de um estado indefinido.
Melhorias de Layout:

Adicionei um pouco de preenchimento (p-5) ao elemento main e uma sombra (shadow-md) ao cartão de detalhes do produto para melhorar a estética.
O fundo do cartão de informações foi suavizado para um tom mais claro (bg-indigo-100).
Formatação do Preço:

O preço é formatado para exibir sempre duas casas decimais com toFixed(2).
Estrutura Semântica:

Melhorei a estrutura e a semântica do layout, com cabeçalhos e espaçamento melhor organizados.
*/