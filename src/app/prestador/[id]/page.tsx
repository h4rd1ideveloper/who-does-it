'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Avaliacao from '@/components/common/Avaliacao';
import { FaStar, FaWhatsapp, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Image from 'next/image';

export default function PerfilPrestador() {
  const params = useParams();
  const id = params?.id;

  const [prestador, setPrestador] = useState({
    id: 1,
    nome: 'João Silva',
    foto_url: 'https://randomuser.me/api/portraits/men/1.jpg',
    nota_media: 4.8,
    total_avaliacoes: 25,
    descricao: 'Eletricista profissional com mais de 10 anos de experiência em instalações residenciais e comerciais. Formado em técnico em eletrotécnica, trabalho com instalações, reparos e manutenção preventiva.',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    atende_domicilio: true,
    horario_funcionamento: 'Seg-Sex: 08:00-18:00; Sáb: 08:00-12:00',
    servicos: [{
      id: 1,
      categoria: { id: 1, nome: 'Eletricista', slug: 'eletricista' },
      titulo: 'Instalação de Ar-Condicionado',
      descricao: 'Instalação completa de ar-condicionado split, incluindo suportes e tubulação.',
      preco_min: 200.00,
      preco_max: 400.00,
      tempo_estimado: '2h',
      local_atendimento: 'domicilio',
      fotos_urls: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'],
    }, {
      id: 2,
      categoria: { id: 1, nome: 'Eletricista', slug: 'eletricista' },
      titulo: 'Instalação de Tomadas e Interruptores',
      descricao: 'Instalação e substituição de tomadas e interruptores residenciais.',
      preco_min: 80.00,
      preco_max: 150.00,
      tempo_estimado: '1h',
      local_atendimento: 'domicilio',
      fotos_urls: ['https://images.unsplash.com/photo-1558882224-dda166733046?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'],
    }],
    avaliacoes: [{
      nome_cliente: 'Maria Souza',
      nota: 5,
      comentario: 'Excelente profissional, pontual e trabalho de qualidade.',
      data_hora: '2025-05-20T14:30:00Z',
    }, {
      nome_cliente: 'Pedro Oliveira', nota: 4, comentario: 'Bom serviço, recomendo.', data_hora: '2025-05-15T10:15:00Z',
    }],
    contatos: {
      whatsapp: '5511999999999',
      email: 'joao.silva@exemplo.com',
      telefone: '11999999999',
      site_externo: 'https://joaosilva.com.br',
    },
  });

  const [novaAvaliacao, setNovaAvaliacao] = useState({
    nome_cliente: '', nota: 5, comentario: '',
  });

  const [enviandoAvaliacao, setEnviandoAvaliacao] = useState(false);
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);

  // Simular chamada à API para registrar visita
  React.useEffect(() => {
    // Em um ambiente real, faríamos:
    // api.post('/metricas/visita', { prestador_id: id, origem: 'perfil' });
    console.log('Registrando visita ao perfil do prestador', id);

    // Também buscaríamos os dados do prestador
    // api.get(`/prestador/${id}`)
    //   .then(response => setPrestador(response.data))
    //   .catch(error => console.error('Erro ao buscar dados do prestador:', error));
  }, [id]);

  const handleClickContato = (tipo: string) => {
    // Em um ambiente real, faríamos:
    // api.post('/metricas/clique', { prestador_id: id, tipo_contato: tipo });
    console.log('Registrando clique em contato', tipo);

    // Abrir o link apropriado
    let url = '';
    switch (tipo) {
      case 'whatsapp':
        url = `https://wa.me/${prestador.contatos.whatsapp}`;
        break;
      case 'email':
        url = `mailto:${prestador.contatos.email}`;
        break;
      case 'telefone':
        url = `tel:${prestador.contatos.telefone}`;
        break;
      case 'site':
        url = prestador.contatos.site_externo;
        break;
    }

    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleAvaliacaoChange: React.ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setNovaAvaliacao({
      ...novaAvaliacao, [name]: value,
    });
  };

  const handleSubmitAvaliacao: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setEnviandoAvaliacao(true);

    // Simular envio para API
    setTimeout(() => {
      // Em um ambiente real, faríamos:
      // api.post('/avaliacoes', { 
      //   prestador_id: id, 
      //   nome_cliente: novaAvaliacao.nome_cliente,
      //   nota: novaAvaliacao.nota,
      //   comentario: novaAvaliacao.comentario
      // });

      // Atualizar estado local para simular resposta
      setPrestador({
        ...prestador, avaliacoes: [{
          nome_cliente: novaAvaliacao.nome_cliente,
          nota: novaAvaliacao.nota,
          comentario: novaAvaliacao.comentario,
          data_hora: new Date().toISOString(),
        }, ...prestador.avaliacoes],
      });

      setNovaAvaliacao({
        nome_cliente: '', nota: 5, comentario: '',
      });

      setEnviandoAvaliacao(false);
      setAvaliacaoEnviada(true);

      // Resetar mensagem de sucesso após alguns segundos
      setTimeout(() => {
        setAvaliacaoEnviada(false);
      }, 3000);
    }, 1000);
  };

  return (<main>
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Seção 1: Cabeçalho */}
        <section className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="h-48 bg-blue-900 relative">
            {prestador.foto_url && (<Image
                src={prestador.foto_url}
                alt={prestador.nome}
                fill
                className="object-cover opacity-30"
              />)}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-3xl md:text-4xl font-bold">{prestador.nome}</h1>
                <div className="flex items-center justify-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (<FaStar
                        key={i}
                        className={`${i < Math.round(prestador.nota_media) ? 'text-yellow-500' : 'text-gray-300'}`}
                      />))}
                  </div>
                  <span className="ml-2">
                    {prestador.nota_media.toFixed(1)} • {prestador.total_avaliacoes} avaliações
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleClickContato('whatsapp')}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                <FaWhatsapp className="mr-2" /> WhatsApp
              </button>
              <button
                onClick={() => handleClickContato('email')}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <FaEnvelope className="mr-2" /> E-mail
              </button>
              <button
                onClick={() => handleClickContato('telefone')}
                className="flex items-center bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
              >
                <FaPhone className="mr-2" /> Telefone
              </button>
              {prestador.contatos.site_externo && (<button
                  onClick={() => handleClickContato('site')}
                  className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaGlobe className="mr-2" /> Site/Portfólio
                </button>)}
            </div>
          </div>
        </section>

        {/* Seção 2: Informações Gerais */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Sobre o Prestador</h2>

          <p className="text-gray-700 mb-6">{prestador.descricao}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" /> Endereço
              </h3>
              <p className="text-gray-700">
                {prestador.endereco}, {prestador.cidade} - {prestador.estado}, {prestador.cep}
              </p>
              <p className="text-gray-700 mt-1">
                {prestador.atende_domicilio ? 'Atende a domicílio' : 'Atendimento somente na oficina'}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaClock className="mr-2 text-blue-600" /> Horário de Funcionamento
              </h3>
              <p className="text-gray-700">{prestador.horario_funcionamento}</p>
            </div>
          </div>
        </section>

        {/* Seção 3: Serviços Oferecidos */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Serviços Oferecidos</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {prestador.servicos.map(servico => (<div key={servico.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{servico.titulo}</h3>
                <div className="text-sm text-blue-600 mb-2">
                  {servico.categoria.nome}
                </div>
                <p className="text-gray-700 mb-3">{servico.descricao}</p>

                <div className="flex justify-between mb-3">
                  <div>
                    <span className="font-medium">Preço:</span>{' '}
                    {servico.preco_max ? `R$ ${servico.preco_min.toFixed(2)} - R$ ${servico.preco_max.toFixed(2)}` : `R$ ${servico.preco_min.toFixed(2)}`}
                  </div>
                  <div>
                    <span className="font-medium">Tempo:</span> {servico.tempo_estimado}
                  </div>
                </div>

                {servico.fotos_urls && servico.fotos_urls.length > 0 && (<div className="flex gap-2 mt-3">
                    {servico.fotos_urls.map((foto, index) => (
                      <div key={index} className="w-20 h-20 relative rounded overflow-hidden">
                        <Image
                          src={foto}
                          alt={`Foto ${index + 1} de ${servico.titulo}`}
                          fill
                          className="object-cover"
                        />
                      </div>))}
                  </div>)}
              </div>))}
          </div>
        </section>

        {/* Seção 4: Avaliações de Clientes */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Avaliações de Clientes</h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Deixe sua avaliação</h3>

            <form onSubmit={handleSubmitAvaliacao}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Seu nome</label>
                <input
                  type="text"
                  name="nome_cliente"
                  value={novaAvaliacao.nome_cliente}
                  onChange={handleAvaliacaoChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Sua avaliação</label>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (<button
                      key={star}
                      type="button"
                      onClick={() => setNovaAvaliacao({ ...novaAvaliacao, nota: star })}
                      className="text-2xl"
                    >
                      <FaStar
                        className={star <= novaAvaliacao.nota ? 'text-yellow-500' : 'text-gray-300'}
                      />
                    </button>))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Comentário (opcional)</label>
                <textarea
                  name="comentario"
                  value={novaAvaliacao.comentario}
                  onChange={handleAvaliacaoChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                disabled={enviandoAvaliacao}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:bg-blue-400"
              >
                {enviandoAvaliacao ? 'Enviando...' : 'Enviar Avaliação'}
              </button>

              {avaliacaoEnviada && (<div className="mt-2 text-green-600">
                  Avaliação enviada com sucesso!
                </div>)}
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">
              {prestador.avaliacoes.length} Avaliações
            </h3>

            {prestador.avaliacoes.map((avaliacao, index) => (<Avaliacao
                key={index}
                {...avaliacao}
              />))}
          </div>
        </section>
      </div>

      <Footer />
    </main>);
}
