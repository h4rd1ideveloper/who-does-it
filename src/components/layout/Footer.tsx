import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4">Eu Faço Isso</h3>
            <p className="text-blue-200 mb-4">
              Conectando clientes a prestadores de serviços qualificados em todo o Brasil.
            </p>
            <p className="text-blue-200">
              © {new Date().getFullYear()} Eu Faço Isso. Todos os direitos reservados.
            </p>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white transition">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/cadastro-prestador" className="text-blue-200 hover:text-white transition">
                  Seja um Prestador
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-blue-200 hover:text-white transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-blue-200 hover:text-white transition">
                  Categorias
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-blue-200">
                Email: contato@eufacoisso.com.br
              </li>
              <li className="text-blue-200">
                Telefone: (11) 9999-9999
              </li>
              <li className="text-blue-200">
                Horário: Seg-Sex, 9h às 18h
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
