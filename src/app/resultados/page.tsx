import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CardPrestador from '@/components/common/CardPrestador';
import BuscaAutocomplete from '@/components/common/BuscaAutocomplete';
import { FaFilter, FaStar, FaHome, FaSort } from 'react-icons/fa';

export default function Resultados() {
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [prestadores, setPrestadores] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Parâmetros de busca
  const query = searchParams.get('query') || '';
  const categoria = searchParams.get('categoria') || '';
  const cidade = searchParams.get('cidade') || '';
  const ordenarPor = searchParams.get('ordenar_por') || 'mais_visitados';

  // Filtros
  const [filtros, setFiltros] = useState({
    precoMin: 0,
    precoMax: 1000,
    notaMinima: 0,
    atendeDomicilio: false,
    disponivelHoje: false,
    localizacao: '',
  });

  // Dados simulados para demonstração
  const prestadoresSimulados = [
    {
      id: 1,
      nome: 'João Silva',
      foto_url: 'https://randomuser.me/api/portraits/men/1.jpg',
      nota_media: 4.8,
      total_avaliacoes: 25,
      preco_min: 200,
      preco_max: 400,
      slogan: 'Eletricista residencial especializado',
      local_atendimento: 'domicilio',
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      foto_url: 'https://randomuser.me/api/portraits/women/1.jpg',
      nota_media: 4.5,
      total_avaliacoes: 18,
      preco_min: 150,
      preco_max: 300,
      slogan: 'Pintora profissional com 10 anos de experiência',
      local_atendimento: 'ambos',
    },
    {
      id: 3,
      nome: 'Carlos Pereira',
      foto_url: 'https://randomuser.me/api/portraits/men/2.jpg',
      nota_media: 4.2,
      total_avaliacoes: 12,
      preco_min: 180,
      slogan: 'Encanador - atendimento rápido e eficiente',
      local_atendimento: 'domicilio',
    },
  ];

  useEffect(() => {
    // Simulando chamada à API
    setLoading(true);
    setTimeout(() => {
      setPrestadores(prestadoresSimulados);
      setLoading(false);
    }, 1000);
    
    // Em um ambiente real, faríamos uma chamada à API
    // api.get(`/prestadores?query=${query}&categoria=${categoria}&cidade=${cidade}&ordenar_por=${ordenarPor}`)
    //   .then(response => {
    //     setPrestadores(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Erro ao buscar prestadores:', error);
    //     setLoading(false);
    //   });
  }, [query, categoria, cidade, ordenarPor]);

  const handleSearch = (newQuery) => {
    // Redirecionar para a mesma página com novos parâmetros
    window.location.href = `/resultados?query=${encodeURIComponent(newQuery)}`;
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltros({
      ...filtros,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <main>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">
            {query 
              ? `Resultados para "${query}"` 
              : categoria 
                ? `Categoria: ${categoria}` 
                : 'Todos os prestadores'}
          </h1>
          
          <BuscaAutocomplete 
            onSearch={handleSearch}
            placeholder="Refinar busca..."
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtros - Desktop */}
          <div className="hidden md:block w-64 bg-white rounded-lg shadow-md p-4 h-fit">
            <h2 className="font-bold text-lg mb-4 flex items-center">
              <FaFilter className="mr-2" /> Filtros
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Faixa de Preço</h3>
                <div className="flex items-center space-x-2">
                  <input 
                    type="number" 
                    name="precoMin"
                    value={filtros.precoMin}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    name="precoMax"
                    value={filtros.precoMax}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                    placeholder="Max"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Avaliação Mínima</h3>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFiltros({...filtros, notaMinima: star})}
                      className={`text-2xl ${
                        star <= filtros.notaMinima ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Tipo de Atendimento</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="atendeDomicilio"
                      checked={filtros.atendeDomicilio}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span>Atende a domicílio</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="disponivelHoje"
                      checked={filtros.disponivelHoje}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span>Disponível hoje</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Localização</h3>
                <input 
                  type="text" 
                  name="localizacao"
                  value={filtros.localizacao}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                  placeholder="Digite sua cidade"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Ordenar por</h3>
                <select 
                  className="w-full p-2 border rounded"
                  value={ordenarPor}
                  onChange={(e) => {
                    window.location.href = `/resultados?query=${query}&categoria=${categoria}&cidade=${cidade}&ordenar_por=${e.target.value}`;
                  }}
                >
                  <option value="mais_visitados">Mais visitados</option>
                  <option value="melhor_avaliados">Melhor avaliados</option>
                  <option value="menor_preco">Menor preço</option>
                </select>
              </div>
              
              <button 
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
          
          {/* Botão de Filtro - Mobile */}
          <div className="md:hidden mb-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              <FaFilter className="mr-2" /> 
              {isFilterOpen ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>
            
            {isFilterOpen && (
              <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                {/* Conteúdo do filtro mobile - mesmo do desktop */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Faixa de Preço</h3>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        name="precoMin"
                        value={filtros.precoMin}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded"
                        placeholder="Min"
                      />
                      <span>-</span>
                      <input 
                        type="number" 
                        name="precoMax"
                        value={filtros.precoMax}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Avaliação Mínima</h3>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFiltros({...filtros, notaMinima: star})}
                          className={`text-2xl ${
                            star <= filtros.notaMinima ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        >
                          <FaStar />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Tipo de Atendimento</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          name="atendeDomicilio"
                          checked={filtros.atendeDomicilio}
                          onChange={handleFilterChange}
                          className="mr-2"
                        />
                        <span>Atende a domicílio</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          name="disponivelHoje"
                          checked={filtros.disponivelHoje}
                          onChange={handleFilterChange}
                          className="mr-2"
                        />
                        <span>Disponível hoje</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Localização</h3>
                    <input 
                      type="text" 
                      name="localizacao"
                      value={filtros.localizacao}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                      placeholder="Digite sua cidade"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Ordenar por</h3>
                    <select 
                      className="w-full p-2 border rounded"
                      value={ordenarPor}
                      onChange={(e) => {
                        window.location.href = `/resultados?query=${query}&categoria=${categoria}&cidade=${cidade}&ordenar_por=${e.target.value}`;
                      }}
                    >
                      <option value="mais_visitados">Mais visitados</option>
                      <option value="melhor_avaliados">Melhor avaliados</option>
                      <option value="menor_preco">Menor preço</option>
                    </select>
                  </div>
                  
                  <button 
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Lista de Prestadores */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : prestadores.length > 0 ? (
              <div className="space-y-6">
                {prestadores.map(prestador => (
                  <CardPrestador 
                    key={prestador.id}
                    {...prestador}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">Nenhum prestador encontrado</h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar seus filtros ou fazer uma nova busca.
                </p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Voltar para a página inicial
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
