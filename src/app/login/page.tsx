import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaKey, FaUser, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import api from '@/services/api';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulando chamada à API
      // Em um ambiente real, faríamos:
      // const response = await api.post('/auth/login', formData);
      
      // Simulando resposta
      setTimeout(() => {
        // Verificar credenciais (simulado)
        if (formData.email === 'prestador@exemplo.com' && formData.senha === 'senha123') {
          // Simular token JWT
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6IkpvYW8gU2lsdmEiLCJ0aXBvX3VzdWFyaW8iOiJwcmVzdGFkb3IiLCJpYXQiOjE2MjM0NTY3ODksImV4cCI6MTYyMzU0MzE4OX0.3i5Ew7yTQT7AjR5YNGMRbGXPQqi-zj3EKR3g-8Vj0jI';
          
          // Salvar token no localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('jwt_prestador', token);
          }
          
          setSuccess(true);
          
          // Redirecionar após login
          setTimeout(() => {
            window.location.href = '/prestador/dashboard';
          }, 1500);
        } else {
          setError('Email ou senha incorretos');
        }
        
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <main>
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-900 p-6 text-white text-center">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="mt-2">Acesse sua conta de prestador</p>
          </div>
          
          <div className="p-6">
            {success ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p>Login realizado com sucesso! Redirecionando...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
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
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="senha"
                      name="senha"
                      type="password"
                      value={formData.senha}
                      onChange={handleChange}
                      className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="********"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Lembrar-me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
                
                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-400"
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600">
                    Não tem uma conta?{' '}
                    <Link href="/cadastro-prestador" className="text-blue-600 hover:text-blue-800">
                      Cadastre-se como prestador
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-8 max-w-md mx-auto text-center">
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
            <h3 className="font-bold">Credenciais para teste:</h3>
            <p>Email: prestador@exemplo.com</p>
            <p>Senha: senha123</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
