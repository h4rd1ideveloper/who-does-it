'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import Link from 'next/link';
import { AppProps } from 'next/app'
import Image from 'next/image';
type Payload = {
  categoria_id: number,
  titulo: string,
  descricao: string,
  preco_min: number,
  preco_max?: number,
  tempo_estimado: string,
  local_atendimento: string,
  fotos_urls: string[]
}
export default function EditarServico({ params }: AppProps['pageProps']) {
  const { id } = params;
  
  const [formData, setFormData] = useState<Payload>({
    categoria_id: 0,
    titulo: '',
    descricao: '',
    preco_min: 0,
    preco_max: 0,
    tempo_estimado: '',
    local_atendimento: 'domicilio',
    fotos_urls: []
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Lista simulada de categorias
  const categorias = [
    { id: 1, nome: 'Eletricista' },
    { id: 2, nome: 'Encanador' },
    { id: 3, nome: 'Pintor' },
    { id: 4, nome: 'Pedreiro' },
    { id: 5, nome: 'Diarista' },
  ];
  
  // Simular chamada à API para buscar dados do serviço
  useEffect(() => {
    // Em um ambiente real, faríamos:
    // api.get(`/servicos/${id}`)
    //   .then(response => {
    //     setFormData(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Erro ao buscar serviço:', error);
    //     setError('Erro ao carregar dados do serviço. Tente novamente.');
    //     setLoading(false);
    //   });
    
    // Simulando resposta
    setTimeout(() => {
      if (id === '1') {
        setFormData({
          categoria_id: 1,
          titulo: 'Instalação de Ar-Condicionado',
          descricao: 'Instalação completa de ar-condicionado split, incluindo suportes e tubulação.',
          preco_min: 200.00,
          preco_max: 400.00,
          tempo_estimado: '2h',
          local_atendimento: 'domicilio',
          fotos_urls: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80']
        });
      } else if (id === '2') {
        setFormData({
          categoria_id: 1,
          titulo: 'Instalação de Tomadas e Interruptores',
          descricao: 'Instalação e substituição de tomadas e interruptores residenciais.',
          preco_min: 80.00,
          preco_max: 150.00,
          tempo_estimado: '1h',
          local_atendimento: 'domicilio',
          fotos_urls: ['https://images.unsplash.com/photo-1558882224-dda166733046?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80']
        });
      } else {
        setError('Serviço não encontrado');
      }
      
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleChange: React.ChangeEventHandler<HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement> = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };
  
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      // Validar campos obrigatórios
      if (!formData.categoria_id || !formData.titulo || !formData.preco_min) {
        console.error('Preencha todos os campos obrigatórios');
        return false
      }
      
      // Simulando chamada à API
      // Em um ambiente real, faríamos:
      // const response = await api.put(`/servicos/${id}`, formData);
      
      // Simulando resposta
      setTimeout(() => {
        setSuccess(true);
        setSaving(false);
        
        // Redirecionar após atualização
        setTimeout(() => {
          window.location.href = '/prestador/servicos';
        }, 2000);
      }, 1500);
    } catch (err) {
      console.log(err);
      setError('Erro ao atualizar serviço. Tente novamente.');
      setSaving(false);
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
            <div className="flex items-center mb-6">
              <Link 
                href="/prestador/servicos"
                className="mr-4 text-blue-600 hover:text-blue-800"
              >
                <FaArrowLeft /> Voltar
              </Link>
              <h1 className="text-2xl font-bold">Editar Serviço</h1>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : success ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <h3 className="font-bold text-xl mb-2">Serviço atualizado com sucesso!</h3>
                <p>Você será redirecionado para a lista de serviços em instantes.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria_id">
                      Categoria *
                    </label>
                    <select
                      id="categoria_id"
                      name="categoria_id"
                      value={formData.categoria_id}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
                      Título do Serviço *
                    </label>
                    <input
                      id="titulo"
                      name="titulo"
                      type="text"
                      value={formData.titulo}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ex: Instalação de Ar-Condicionado"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricao">
                      Descrição
                    </label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Descreva o serviço oferecido"
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preco_min">
                        Preço Mínimo (R$) *
                      </label>
                      <input
                        id="preco_min"
                        name="preco_min"
                        type="number"
                        value={formData.preco_min}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preco_max">
                        Preço Máximo (R$)
                      </label>
                      <input
                        id="preco_max"
                        name="preco_max"
                        type="number"
                        value={formData.preco_max}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tempo_estimado">
                        Tempo Estimado
                      </label>
                      <input
                        id="tempo_estimado"
                        name="tempo_estimado"
                        type="text"
                        value={formData.tempo_estimado}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ex: 2h, 30min"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="local_atendimento">
                        Local de Atendimento
                      </label>
                      <select
                        id="local_atendimento"
                        name="local_atendimento"
                        value={formData.local_atendimento}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="domicilio">Domicílio do Cliente</option>
                        <option value="oficina">Minha Oficina/Estabelecimento</option>
                        <option value="ambos">Ambos</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Fotos do Serviço
                    </label>
                    
                    {formData.fotos_urls && formData.fotos_urls.length > 0 ? (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Fotos atuais:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.fotos_urls.map((foto, index) => (
                            <div key={index} className="w-24 h-24 relative">
                              <Image
                                src={foto}
                                alt={`Foto ${index + 1}`}
                                className="w-full h-full object-cover rounded"
                                width={100}
                                height={100}
                                quality={100}
                              />
                              <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                onClick={() => {
                                  const newFotos = [...formData.fotos_urls];
                                  newFotos.splice(index, 1);
                                  setFormData({
                                    ...formData,
                                    fotos_urls: newFotos
                                  });
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    
                    <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center">
                      <p className="text-gray-500 mb-2">Arraste e solte imagens aqui ou clique para selecionar</p>
                      <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Adicionar Imagens
                      </button>
                      <p className="text-gray-500 mt-2 text-sm">Máximo de 5 imagens (JPG, PNG)</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg inline-flex items-center disabled:bg-green-400"
                    >
                      <FaSave className="mr-2" /> {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
