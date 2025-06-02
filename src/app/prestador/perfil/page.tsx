import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaCamera, FaClock } from 'react-icons/fa';
import Link from 'next/link';
import api from '@/services/api';

export default function EditarPerfil() {
  const [formData, setFormData] = useState({
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    cpf_cnpj: '123.456.789-00',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    atende_domicilio: true,
    horario_funcionamento: 'Seg-Sex: 08:00-18:00; Sáb: 08:00-12:00',
    foto_url: 'https://randomuser.me/api/portraits/men/1.jpg',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Simular chamada à API para buscar dados do prestador
  useEffect(() => {
    // Em um ambiente real, faríamos:
    // api.get('/prestador/perfil')
    //   .then(response => {
    //     setFormData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Erro ao buscar dados do perfil:', error);
    //     setError('Erro ao carregar dados do perfil. Tente novamente.');
    //   });
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulando chamada à API
      // Em um ambiente real, faríamos:
      // const response = await api.put('/prestador/perfil', formData);
      
      // Simulando resposta
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        
        // Limpar mensagem de sucesso após alguns segundos
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }, 1500);
    } catch (err) {
      setError('Erro ao atualizar perfil. Tente novamente.');
      setLoading(false);
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
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
                <img 
                  src={formData.foto_url} 
                  alt={formData.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{formData.nome}</h2>
              <p className="text-gray-600">Prestador de Serviços</p>
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
                    className="block py-2 px-4 rounded hover:bg-gray-100 text-gray-700"
                  >
                    Meus Serviços
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/prestador/perfil"
                    className="block py-2 px-4 rounded bg-blue-100 text-blue-800 font-medium"
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
            <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}
              
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <p>Perfil atualizado com sucesso!</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2">Dados Pessoais</h2>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        value={formData.nome}
                        onChange={handleChange}
                        className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf_cnpj">
                      CPF/CNPJ
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaIdCard className="text-gray-400" />
                      </div>
                      <input
                        id="cpf_cnpj"
                        name="cpf_cnpj"
                        type="text"
                        value={formData.cpf_cnpj}
                        onChange={handleChange}
                        className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefone">
                      Telefone/WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        id="telefone"
                        name="telefone"
                        type="text"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2">Endereço e Atendimento</h2>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endereco">
                      Endereço
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <input
                        id="endereco"
                        name="endereco"
                        type="text"
                        value={formData.endereco}
                        onChange={handleChange}
                        className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cidade">
                        Cidade
                      </label>
                      <input
                        id="cidade"
                        name="cidade"
                        type="text"
                        value={formData.cidade}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                        Estado
                      </label>
                      <input
                        id="estado"
                        name="estado"
                        type="text"
                        value={formData.estado}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cep">
                      CEP
                    </label>
                    <input
                      id="cep"
                      name="cep"
                      type="text"
                      value={formData.cep}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="atende_domicilio"
                        checked={formData.atende_domicilio}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Atende a domicílio</span>
                    </label>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horario_funcionamento">
                      Horário de Funcionamento
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="text-gray-400" />
                      </div>
                      <input
                        id="horario_funcionamento"
                        name="horario_funcionamento"
                        type="text"
                        value={formData.horario_funcionamento}
                        onChange={handleChange}
                        className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ex: Seg-Sex: 08:00-18:00; Sáb: 08:00-12:00"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2">Foto de Perfil</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
                      <img 
                        src={formData.foto_url} 
                        alt={formData.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex items-center"
                      >
                        <FaCamera className="mr-2" /> Alterar Foto
                      </button>
                      <p className="text-gray-500 text-sm mt-1">JPG ou PNG, máximo 5MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg disabled:bg-green-400"
                  >
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
