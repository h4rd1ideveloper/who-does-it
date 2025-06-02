import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

interface CardPrestadorProps {
  id: number;
  nome: string;
  foto_url: string;
  nota_media: number;
  total_avaliacoes: number;
  preco_min?: number;
  preco_max?: number;
  slogan: string;
  local_atendimento: string;
}

const CardPrestador: React.FC<CardPrestadorProps> = ({
  id,
  nome,
  foto_url,
  nota_media,
  total_avaliacoes,
  preco_min,
  preco_max,
  slogan,
  local_atendimento,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Imagem */}
        <div className="w-full md:w-1/3 h-48 md:h-auto relative">
          {foto_url ? (
            <Image
              src={foto_url}
              alt={nome}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="w-full md:w-2/3 p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800">{nome}</h3>
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="font-medium">{nota_media.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({total_avaliacoes})</span>
            </div>
          </div>

          <p className="text-gray-600 mt-2">{slogan}</p>

          <div className="mt-3 text-gray-700">
            <p>
              {local_atendimento === 'domicilio' 
                ? 'Atende a domicílio' 
                : local_atendimento === 'oficina' 
                  ? 'Atendimento na oficina' 
                  : 'Atende na oficina e a domicílio'}
            </p>
            <p className="mt-1">
              {preco_min 
                ? `Preço: R$ ${preco_min.toFixed(2)}${preco_max ? ` - R$ ${preco_max.toFixed(2)}` : ''}`
                : 'Preço sob consulta'}
            </p>
          </div>

          <div className="mt-4">
            <Link 
              href={`/prestador/${id}`}
              className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg inline-block transition"
            >
              Ver perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPrestador;
