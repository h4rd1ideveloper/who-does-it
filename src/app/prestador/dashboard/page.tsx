'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GraficoMetricas from '@/components/common/GraficoMetricas';
import { FaEye, FaPhone, FaEdit, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  const [prestador] = useState({
    id: 1,
    nome: 'João Silva',
    foto_url: 'https://randomuser.me/api/portraits/men/1.jpg',
    nota_media: 4.8,
    total_avaliacoes: 25,
  });

  const [metricas] = useState({
    visitas: {
      periodo: '7', // dias
      dados: [{ data: '2025-05-26', total_visitas: 5 }, { data: '2025-05-27', total_visitas: 8 }, {
        data: '2025-05-28', total_visitas: 12,
      }, { data: '2025-05-29', total_visitas: 7 }, { data: '2025-05-30', total_visitas: 10 }, {
        data: '2025-05-31', total_visitas: 15,
      }, { data: '2025-06-01', total_visitas: 9 }],
    }, cliques: {
      periodo: '7', // dias
      dados: [{ data: '2025-05-26', tipo_contato: 'whatsapp', total_cliques: 2 }, {
        data: '2025-05-26', tipo_contato: 'telefone', total_cliques: 1,
      }, { data: '2025-05-26', tipo_contato: 'email', total_cliques: 0 }, {
        data: '2025-05-27', tipo_contato: 'whatsapp', total_cliques: 3,
      }, { data: '2025-05-27', tipo_contato: 'telefone', total_cliques: 2 }, {
        data: '2025-05-27', tipo_contato: 'email', total_cliques: 1,
      }, { data: '2025-05-28', tipo_contato: 'whatsapp', total_cliques: 4 }, {
        data: '2025-05-28', tipo_contato: 'telefone', total_cliques: 1,
      }, { data: '2025-05-28', tipo_contato: 'email', total_cliques: 2 }, {
        data: '2025-05-29', tipo_contato: 'whatsapp', total_cliques: 2,
      }, { data: '2025-05-29', tipo_contato: 'telefone', total_cliques: 1 }, {
        data: '2025-05-29', tipo_contato: 'email', total_cliques: 0,
      }, { data: '2025-05-30', tipo_contato: 'whatsapp', total_cliques: 3 }, {
        data: '2025-05-30', tipo_contato: 'telefone', total_cliques: 2,
      }, { data: '2025-05-30', tipo_contato: 'email', total_cliques: 1 }, {
        data: '2025-05-31', tipo_contato: 'whatsapp', total_cliques: 5,
      }, { data: '2025-05-31', tipo_contato: 'telefone', total_cliques: 3 }, {
        data: '2025-05-31', tipo_contato: 'email', total_cliques: 2,
      }, { data: '2025-06-01', tipo_contato: 'whatsapp', total_cliques: 3 }, {
        data: '2025-06-01', tipo_contato: 'telefone', total_cliques: 2,
      }, { data: '2025-06-01', tipo_contato: 'email', total_cliques: 1 }],
    },
  });

  const [servicos] = useState([{
    id: 1,
    categoria: { id: 1, nome: 'Eletricista', slug: 'eletricista' },
    titulo: 'Instalação de Ar-Condicionado',
    descricao: 'Instalação completa de ar-condicionado split, incluindo suportes e tubulação.',
    preco_min: 200.00,
    preco_max: 400.00,
    tempo_estimado: '2h',
    local_atendimento: 'domicilio',
    fotos_urls: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'],
  }, {
    id: 2,
    categoria: { id: 1, nome: 'Eletricista', slug: 'eletricista' },
    titulo: 'Instalação de Tomadas e Interruptores',
    descricao: 'Instalação e substituição de tomadas e interruptores residenciais.',
    preco_min: 80.00,
    preco_max: 150.00,
    tempo_estimado: '1h',
    local_atendimento: 'domicilio',
    fotos_urls: ['https://images.unsplash.com/photo-1558882224-dda166733046?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'],
  }]);

  const [periodoSelecionado, setPeriodoSelecionado] = useState('7');

  // Simular chamada à API para buscar dados do prestador e métricas
  useEffect(() => {
    // Em um ambiente real, faríamos:
    // api.get('/prestador/perfil')
    //   .then(response => setPrestador(response.data))
    //   .catch(error => console.error('Erro ao buscar dados do prestador:', error));

    // api.get(`/prestador/${prestador.id}/servicos`)
    //   .then(response => setServicos(response.data))
    //   .catch(error => console.error('Erro ao buscar serviços:', error));

    // api.get(`/prestador/${prestador.id}/metricas/visitas?periodo=${periodoSelecionado}`)
    //   .then(response => setMetricas(prev => ({ ...prev, visitas: { periodo: periodoSelecionado, dados: response.data } })))
    //   .catch(error => console.error('Erro ao buscar métricas de visitas:', error));

    // api.get(`/prestador/${prestador.id}/metricas/cliques?periodo=${periodoSelecionado}`)
    //   .then(response => setMetricas(prev => ({ ...prev, cliques: { periodo: periodoSelecionado, dados: response.data } })))
    //   .catch(error => console.error('Erro ao buscar métricas de cliques:', error));
  }, [periodoSelecionado]);

  // Processar dados de cliques para o gráfico
  const processarDadosCliques = () => {
    const dadosProcessados:{
      [key: string]: {
        data:string;
        whatsapp: number;
        telefone: number;
        email: number;
        tipo_contato:number;
      };
    } = {};

    for (const item of metricas.cliques.dados) {
      if (!dadosProcessados[item.data]) {
        dadosProcessados[item.data] = {
          data: item.data, whatsapp: 0, telefone: 0, email: 0,tipo_contato:0
        };
      }

      dadosProcessados[item.data] = {
        ...dadosProcessados[item.data],
        [item.tipo_contato]: item.total_cliques
      };
    }

    return Object.values(dadosProcessados);
  };

  return (<main>
    <Header />

    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
              <Image
                src={prestador.foto_url}
                alt={prestador.nome}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold">{prestador.nome}</h2>
            <p className="text-gray-600">Prestador de Serviços</p>
          </div>

          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/prestador/dashboard"
                  className="block py-2 px-4 rounded bg-blue-100 text-blue-800 font-medium"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/prestador/servicos"
                  className="block py-2 px-4 rounded hover:bg-gray-100 text-gray-700"
                >
                  Meus Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/prestador/perfil"
                  className="block py-2 px-4 rounded hover:bg-gray-100 text-gray-700"
                >
                  Editar Perfil
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    // Limpar token e redirecionar para login
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('jwt_prestador');
                      window.location.href = '/login';
                    }
                  }}
                  className="block w-full text-left py-2 px-4 rounded hover:bg-gray-100 text-gray-700"
                >
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Visitas ao Perfil</h3>
                <FaEye className="text-blue-600" />
              </div>
              <p className="text-3xl font-bold">
                {metricas.visitas.dados.reduce((acc, curr) => acc + curr.total_visitas, 0)}
              </p>
              <p className="text-gray-600 text-sm">Últimos {metricas.visitas.periodo} dias</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Contatos</h3>
                <FaPhone className="text-green-600" />
              </div>
              <p className="text-3xl font-bold">
                {metricas.cliques.dados.reduce((acc, curr) => acc + curr.total_cliques, 0)}
              </p>
              <p className="text-gray-600 text-sm">Últimos {metricas.cliques.periodo} dias</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Avaliações</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{prestador.nota_media.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-3xl font-bold">{prestador.total_avaliacoes}</p>
              <p className="text-gray-600 text-sm">Total de avaliações</p>
            </div>
          </div>

          {/* Seletor de Período */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Métricas de Desempenho</h2>
              <select
                value={periodoSelecionado}
                onChange={(e) => setPeriodoSelecionado(e.target.value)}
                className="border rounded p-2"
              >
                <option value="7">Últimos 7 dias</option>
                <option value="15">Últimos 15 dias</option>
                <option value="30">Últimos 30 dias</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <GraficoMetricas
                data={metricas.visitas.dados}
                dataKey="total_visitas"
                xAxisDataKey="data"
                title="Visitas ao Perfil"
                color="#3B82F6"
              />

              <GraficoMetricas
                data={processarDadosCliques()}
                dataKey="whatsapp"
                xAxisDataKey="data"
                title="Contatos por Tipo"
                color="#10B981"
              />
            </div>
          </div>

          {/* Serviços Recentes */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Meus Serviços</h2>
              <Link
                href="/prestador/servicos/novo"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <FaPlus className="mr-1" /> Adicionar Serviço
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {servicos.map((servico) => (<tr key={servico.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{servico.titulo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{servico.categoria.nome}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {servico.preco_max ? `R$ ${servico.preco_min.toFixed(2)} - R$ ${servico.preco_max.toFixed(2)}` : `R$ ${servico.preco_min.toFixed(2)}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/prestador/servicos/editar/${servico.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FaEdit /> Editar
                    </Link>
                  </td>
                </tr>))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/prestador/servicos"
                className="text-blue-600 hover:text-blue-800"
              >
                Ver todos os serviços
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </main>);
}
