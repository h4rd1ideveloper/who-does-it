'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

export default function GerenciarServicos() {
  const [servicos, setServicos] = useState([
    {
      id: 1,
      categoria: { id: 1, nome: 'Eletricista', slug: 'eletricista' },
      titulo: 'Instalação de Ar-Condicionado',
      descricao: 'Instalação completa de ar-condicionado split, incluindo suportes e tubulação.',
      preco_min: 200.00,
      preco_max: 400.00,
      tempo_estimado: '2h',
      local_atendimento: 'domicilio',
      fotos_urls: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80']
    },
    {
      id: 2,
      categoria: { id: 1, nome: 'Eletricista', slug: 'eletricista' },
      titulo: 'Instalação de Tomadas e Interruptores',
      descricao: 'Instalação e substituição de tomadas e interruptores residenciais.',
      preco_min: 80.00,
      preco_max: 150.00,
      tempo_estimado: '1h',
      local_atendimento: 'domicilio',
      fotos_urls: ['https://images.unsplash.com/photo-1558882224-dda166733046?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80']
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error,] = useState('');
  const [success, setSuccess] = useState('');

  
  // Simular chamada à API para buscar serviços
  useEffect(() => {
    // Em um ambiente real, faríamos:
    // api.get('/servicos/prestador/1')
    //   .then(response => setServicos(response.data))
    //   .catch(error => {
    //     console.error('Erro ao buscar serviços:', error);
    //     setError('Erro ao carregar serviços. Tente novamente.');
    //   });
  }, []);
  
  const handleExcluirServico = (id:number) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      setLoading(true);
      
      // Simulando chamada à API
      setTimeout(() => {
        // Em um ambiente real, faríamos:
        // api.delete(`/servicos/${id}`)
        //   .then(() => {
        //     setServicos(servicos.filter(servico => servico.id !== id));
        //     setSuccess('Serviço excluído com sucesso!');
        //   })
        //   .catch(error => {
        //     console.error('Erro ao excluir serviço:', error);
        //     setError('Erro ao excluir serviço. Tente novamente.');
        //   })
        //   .finally(() => setLoading(false));
        
        setServicos(servicos.filter(servico => servico.id !== id));
        setSuccess('Serviço excluído com sucesso!');
        setLoading(false);
        
        // Limpar mensagem de sucesso após alguns segundos
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }, 1000);
    }
  };

  return (
    <main>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">Painel do Prestador</h2>
            </div>
            
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/prestador/dashboard"
                    className="block py-2 px-4 rounded hover:bg-gray-100 text-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/prestador/servicos"
                    className="block py-2 px-4 rounded bg-blue-100 text-blue-800 font-medium"
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Gerenciar Serviços</h1>
              <Link 
                href="/prestador/servicos/novo"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg inline-flex items-center"
              >
                <FaPlus className="mr-2" /> Novo Serviço
              </Link>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p>{success}</p>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : servicos.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                      {servicos.map((servico) => (
                        <tr key={servico.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{servico.titulo}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{servico.descricao}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{servico.categoria.nome}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {servico.preco_max 
                                ? `R$ ${servico.preco_min.toFixed(2)} - R$ ${servico.preco_max.toFixed(2)}` 
                                : `R$ ${servico.preco_min.toFixed(2)}`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link 
                              href={`/prestador/servicos/editar/${servico.id}`}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              <FaEdit className="inline mr-1" /> Editar
                            </Link>
                            <button
                              onClick={() => handleExcluirServico(servico.id)}
                              className="text-red-600 hover:text-red-900"
                              disabled={loading}
                            >
                              <FaTrash className="inline mr-1" /> Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">Nenhum serviço cadastrado</h3>
                <p className="text-gray-600 mb-4">
                  Você ainda não cadastrou nenhum serviço. Clique no botão abaixo para adicionar seu primeiro serviço.
                </p>
                <Link 
                  href="/prestador/servicos/novo"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex items-center"
                >
                  <FaPlus className="mr-2" /> Adicionar Serviço
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
