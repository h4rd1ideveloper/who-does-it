import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaKey } from 'react-icons/fa';
import Link from 'next/link';
import api from '@/services/api';

export default function CadastroPrestador() {
  const [step, setStep] = useState(1);
  const [token, setToken] = useState('');
  const [tokenValidado, setTokenValidado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    
    // Dados profissionais
    cpf_cnpj: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    atende_domicilio: true,
    horario_funcionamento: 'Seg-Sex: 08:00-18:00; Sáb: 08:00-12:00',
    foto_url: '',
    
    // Serviços iniciais
    servicos: [
      {
        categoria_id: '',
        titulo: '',
        descricao: '',
        preco_min: '',
        preco_max: '',
        tempo_estimado: '',
        local_atendimento: 'domicilio',
      }
    ]
  });
  
  // Lista simulada de categorias
  const categorias = [
    { id: 1, nome: 'Eletricista' },
    { id: 2, nome: 'Encanador' },
    { id: 3, nome: 'Pintor' },
    { id: 4, nome: 'Pedreiro' },
    { id: 5, nome: 'Diarista' },
  ];

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleValidarToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulando validação de token
      // Em um ambiente real, faríamos:
      // const response = await api.get(`/prestadores/validar-token?token=${token}`);
      
      // Simulando resposta
      setTimeout(() => {
        // Para fins de demonstração, qualquer token com mais de 5 caracteres é válido
        if (token.length >= 5) {
          setTokenValidado(true);
        } else {
          setError('Token inválido ou expirado');
        }
        
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Erro ao validar token. Tente novamente.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleServicoChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedServicos = [...formData.servicos];
    updatedServicos[index] = {
      ...updatedServicos[index],
      [name]: type === 'checkbox' ? checked : value,
    };
    
    setFormData({
      ...formData,
      servicos: updatedServicos,
    });
  };

  const addServico = () => {
    setFormData({
      ...formData,
      servicos: [
        ...formData.servicos,
        {
          categoria_id: '',
          titulo: '',
          descricao: '',
          preco_min: '',
          preco_max: '',
          tempo_estimado: '',
          local_atendimento: 'domicilio',
        }
      ]
    });
  };

  const removeServico = (index) => {
    const updatedServicos = [...formData.servicos];
    updatedServicos.splice(index, 1);
    
    setFormData({
      ...formData,
      servicos: updatedServicos,
    });
  };

  const validateStep1 = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setError('Preencha todos os campos obrigatórios');
      return false;
    }
    
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return false;
    }
    
    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.cpf_cnpj || !formData.telefone || !formData.endereco || !formData.cidade || !formData.estado || !formData.cep) {
      setError('Preencha todos os campos obrigatórios');
      return false;
    }
    
    return true;
  };

  const validateStep3 = () => {
    for (const servico of formData.servicos) {
      if (!servico.categoria_id || !servico.titulo || !servico.preco_min) {
        setError('Preencha todos os campos obrigatórios dos serviços');
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    setError('');
    
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Preparar dados para envio
      const dadosCadastro = {
        ...formData,
        token,
      };
      
      // Simulando chamada à API
      // Em um ambiente real, faríamos:
      // const response = await api.post('/prestadores/cadastrar', dadosCadastro);
      
      // Simulando resposta
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        
        // Redirecionar após cadastro
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }, 1500);
    } catch (err) {
      setError('Erro ao realizar cadastro. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <main>
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-900 p-6 text-white text-center">
            <h1 className="text-2xl font-bold">Cadastro de Prestador de Serviços</h1>
            <p className="mt-2">Crie sua conta e comece a oferecer seus serviços</p>
          </div>
          
          <div className="p-6">
            {!tokenValidado ? (
              // Etapa de validação de token
              <div>
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
                  <p>Para se cadastrar como prestador, você precisa de um token de convite válido.</p>
                  <p>Entre em contato com o administrador para obter seu token.</p>
                </div>
                
                <form onSubmit={handleValidarToken}>
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="token">
                      Token de Convite
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaKey className="text-gray-400" />
                      </div>
                      <input
                        id="token"
                        name="token"
                        type="text"
                        value={token}
                        onChange={handleTokenChange}
                        className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Digite seu token de convite"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-400"
                    >
                      {loading ? 'Validando...' : 'Validar Token'}
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-600">
                      Já tem uma conta?{' '}
                      <Link href="/login" className="text-blue-600 hover:text-blue-800">
                        Faça login
                      </Link>
                    </p>
                  </div>
                </form>
                
                <div className="mt-8 text-center">
                  <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
                    <h3 className="font-bold">Para fins de demonstração:</h3>
                    <p>Digite qualquer token com pelo menos 5 caracteres para prosseguir.</p>
                  </div>
                </div>
              </div>
            ) : success ? (
              // Mensagem de sucesso
              <div className="text-center py-8">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <h3 className="font-bold text-xl mb-2">Cadastro realizado com sucesso!</h3>
                  <p>Seu cadastro foi concluído. Você será redirecionado para a página de login em instantes.</p>
                </div>
              </div>
            ) : (
              // Formulário de cadastro em etapas
              <div>
                {/* Indicador de progresso */}
                <div className="flex mb-8">
                  <div className={`flex-1 text-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-100 border-2 border-blue-600' : 'bg-gray-200'}`}>
                      1
                    </div>
                    <div className="mt-2">Dados Pessoais</div>
                  </div>
                  <div className={`flex-1 text-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-100 border-2 border-blue-600' : 'bg-gray-200'}`}>
                      2
                    </div>
                    <div className="mt-2">Dados Profissionais</div>
                  </div>
                  <div className={`flex-1 text-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-100 border-2 border-blue-600' : 'bg-gray-200'}`}>
                      3
                    </div>
                    <div className="mt-2">Serviços</div>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {/* Etapa 1: Dados Pessoais */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                          Nome Completo *
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
                            placeholder="Seu nome completo"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                          Email *
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
                            placeholder="seu.email@exemplo.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                          Senha *
                        </label>
                        <input
                          id="senha"
                          name="senha"
                          type="password"
                          value={formData.senha}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Mínimo de 6 caracteres"
                          required
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmarSenha">
                          Confirmar Senha *
                        </label>
                        <input
                          id="confirmarSenha"
                          name="confirmarSenha"
                          type="password"
                          value={formData.confirmarSenha}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Repita sua senha"
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Próximo
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Etapa 2: Dados Profissionais */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Dados Profissionais</h2>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf_cnpj">
                          CPF/CNPJ *
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
                            placeholder="CPF ou CNPJ"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefone">
                          Telefone/WhatsApp *
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
                            placeholder="(00) 00000-0000"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endereco">
                          Endereço *
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
                            placeholder="Rua, número, complemento"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cidade">
                            Cidade *
                          </label>
                          <input
                            id="cidade"
                            name="cidade"
                            type="text"
                            value={formData.cidade}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Sua cidade"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                            Estado *
                          </label>
                          <input
                            id="estado"
                            name="estado"
                            type="text"
                            value={formData.estado}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="UF"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cep">
                          CEP *
                        </label>
                        <input
                          id="cep"
                          name="cep"
                          type="text"
                          value={formData.cep}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="00000-000"
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
                      
                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horario_funcionamento">
                          Horário de Funcionamento
                        </label>
                        <input
                          id="horario_funcionamento"
                          name="horario_funcionamento"
                          type="text"
                          value={formData.horario_funcionamento}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Ex: Seg-Sex: 08:00-18:00; Sáb: 08:00-12:00"
                        />
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Voltar
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Próximo
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Etapa 3: Serviços */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Serviços Oferecidos</h2>
                      
                      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
                        <p>Adicione pelo menos um serviço que você oferece.</p>
                        <p>Você poderá adicionar mais serviços posteriormente.</p>
                      </div>
                      
                      {formData.servicos.map((servico, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Serviço {index + 1}</h3>
                            {formData.servicos.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeServico(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Remover
                              </button>
                            )}
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`categoria_id_${index}`}>
                              Categoria *
                            </label>
                            <select
                              id={`categoria_id_${index}`}
                              name="categoria_id"
                              value={servico.categoria_id}
                              onChange={(e) => handleServicoChange(index, e)}
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`titulo_${index}`}>
                              Título do Serviço *
                            </label>
                            <input
                              id={`titulo_${index}`}
                              name="titulo"
                              type="text"
                              value={servico.titulo}
                              onChange={(e) => handleServicoChange(index, e)}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Ex: Instalação de Ar-Condicionado"
                              required
                            />
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`descricao_${index}`}>
                              Descrição
                            </label>
                            <textarea
                              id={`descricao_${index}`}
                              name="descricao"
                              value={servico.descricao}
                              onChange={(e) => handleServicoChange(index, e)}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Descreva o serviço oferecido"
                              rows={3}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`preco_min_${index}`}>
                                Preço Mínimo (R$) *
                              </label>
                              <input
                                id={`preco_min_${index}`}
                                name="preco_min"
                                type="number"
                                value={servico.preco_min}
                                onChange={(e) => handleServicoChange(index, e)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`preco_max_${index}`}>
                                Preço Máximo (R$)
                              </label>
                              <input
                                id={`preco_max_${index}`}
                                name="preco_max"
                                type="number"
                                value={servico.preco_max}
                                onChange={(e) => handleServicoChange(index, e)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`tempo_estimado_${index}`}>
                                Tempo Estimado
                              </label>
                              <input
                                id={`tempo_estimado_${index}`}
                                name="tempo_estimado"
                                type="text"
                                value={servico.tempo_estimado}
                                onChange={(e) => handleServicoChange(index, e)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Ex: 2h, 30min"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`local_atendimento_${index}`}>
                                Local de Atendimento
                              </label>
                              <select
                                id={`local_atendimento_${index}`}
                                name="local_atendimento"
                                value={servico.local_atendimento}
                                onChange={(e) => handleServicoChange(index, e)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              >
                                <option value="domicilio">Domicílio do Cliente</option>
                                <option value="oficina">Minha Oficina/Estabelecimento</option>
                                <option value="ambos">Ambos</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mb-6">
                        <button
                          type="button"
                          onClick={addServico}
                          className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          + Adicionar Outro Serviço
                        </button>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-green-400"
                        >
                          {loading ? 'Cadastrando...' : 'Concluir Cadastro'}
                        </button>
                      </div>
                    </div>
                  )}
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
