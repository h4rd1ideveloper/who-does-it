import React from 'react';
import { FaStar } from 'react-icons/fa';

interface AvaliacaoProps {
  nome_cliente: string;
  nota: number;
  comentario?: string;
  data_hora: string;
}

const Avaliacao: React.FC<AvaliacaoProps> = ({
  nome_cliente,
  nota,
  comentario,
  data_hora,
}) => {
  // Formatar data
  const data = new Date(data_hora);
  const dataFormatada = data.toLocaleDateString('pt-BR');

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-800">{nome_cliente}</h4>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`${i < nota ? 'text-yellow-500' : 'text-gray-300'} mr-1`} 
                size={16} 
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">{dataFormatada}</span>
          </div>
        </div>
      </div>
      {comentario && (
        <p className="text-gray-600 mt-2">{comentario}</p>
      )}
    </div>
  );
};

export default Avaliacao;
