import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BuscaAutocomplete from '@/components/common/BuscaAutocomplete';
import Link from 'next/link';
import Image from 'next/image';
import { FaTools, FaBolt, FaPaintRoller, FaWrench, FaHome } from 'react-icons/fa';

export default function Home() {
  // Categorias em alta (simuladas)
  const categoriasEmAlta = [
    { id: 1, nome: 'Eletricista', slug: 'eletricista', icon: <FaBolt size={32} /> },
    { id: 2, nome: 'Encanador', slug: 'encanador', icon: <FaWrench size={32} /> },
    { id: 3, nome: 'Pintor', slug: 'pintor', icon: <FaPaintRoller size={32} /> },
    { id: 4, nome: 'Pedreiro', slug: 'pedreiro', icon: <FaTools size={32} /> },
    { id: 5, nome: 'Diarista', slug: 'diarista', icon: <FaHome size={32} /> },
  ];

  const handleSearch = (query: string) => {
    // Redirecionar para a página de resultados
    window.location.href = `/resultados?query=${encodeURIComponent(query)}`;
  };

  return (
    <main>
      <Header />
      
      {/* Banner Principal */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Encontre os melhores profissionais para o seu serviço
          </h1>
          <p className="text-xl mb-8">
            Conectamos você a prestadores de serviços qualificados na sua região
          </p>
          
          <div className="max-w-2xl mx-auto">
            <BuscaAutocomplete 
              onSearch={handleSearch}
              categorias={categoriasEmAlta}
            />
          </div>
        </div>
      </section>

      {/* Categorias em Alta */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Categorias em Alta</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriasEmAlta.map(categoria => (
              <Link 
                key={categoria.id}
                href={`/resultados?categoria=${categoria.slug}`}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition flex flex-col items-center"
              >
                <div className="text-blue-600 mb-3">
                  {categoria.icon}
                </div>
                <h3 className="font-medium text-gray-800">{categoria.nome}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Como Funciona</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Busque um serviço</h3>
              <p className="text-gray-600">
                Digite o que você precisa ou navegue pelas categorias disponíveis.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare profissionais</h3>
              <p className="text-gray-600">
                Veja avaliações, preços e escolha o melhor prestador para seu serviço.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Entre em contato</h3>
              <p className="text-gray-600">
                Contate diretamente o prestador por WhatsApp, telefone ou e-mail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seja um Prestador */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Seja um Prestador de Serviços</h2>
              <p className="text-xl mb-6">
                Aumente sua visibilidade e encontre novos clientes para o seu negócio.
              </p>
              <Link 
                href="/cadastro-prestador"
                className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg inline-block transition text-lg"
              >
                Cadastre-se como Prestador
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-700 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>Perfil profissional personalizado</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-700 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>Receba avaliações e construa sua reputação</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-700 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>Acompanhe métricas de visitas e contatos</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-700 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>Gerencie seus serviços e preços</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
