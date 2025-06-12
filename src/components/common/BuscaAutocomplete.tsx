"use client";
import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface BuscaAutocompleteProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  categorias?: Array<{ id: number; nome: string; slug: string }>;
}

const BuscaAutocomplete: React.FC<BuscaAutocompleteProps> = ({
  placeholder = "O que você precisa? Ex.: eletricista, encanador...",
  onSearch,
  categorias = []
}) => {
  const [query, setQuery] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<Array<{ id: number; nome: string; slug: string }>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);

    // Filtrar sugestões baseadas no input do usuário
    if (userInput.length > 1) {
      const filtered = categorias.filter(
        categoria => categoria.nome.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
    e.preventDefault();
  };

  const handleSuggestionClick = (suggestion: { id: number; nome: string; slug: string }) => {
    setQuery(suggestion.nome);
    setShowSuggestions(false);
    onSearch(suggestion.nome);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full py-3 px-4 rounded-lg text-gray-800 focus:outline-none border border-gray-300"
          onBlur={() => {
            // Pequeno delay para permitir o clique na sugestão
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          onFocus={() => {
            if (query.length > 1) {
              setShowSuggestions(true);
            }
          }}
        />
        <button 
          type="submit" 
          className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
        >
          <FaSearch size={18} />
        </button>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {filteredSuggestions.map(suggestion => (
            <li 
              key={suggestion.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscaAutocomplete;
