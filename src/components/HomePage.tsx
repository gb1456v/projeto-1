import React from 'react';
import { ShoppingBag, Zap, Heart, Star } from 'lucide-react';
import { products } from '../data/mockData';

const HomePage: React.FC = () => {
  const testimonials = [
    {
      name: 'Roberto Lima',
      text: 'Impressão nítida e entrega super rápida. Recomendo!',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Ana Carolina',
      text: 'Qualidade excepcional e atendimento personalizado.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Carlos Mendes',
      text: 'Produtos únicos e feitos com muito cuidado.',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const partners = ['NIKE', 'ADIDAS', 'PUMA', 'UNDER ARMOUR'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            QUALIDADE & PERSONALIZAÇÃO
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Especialistas em confecção personalizada de <strong>roupas, canecas e acessórios</strong>. 
            Produtos únicos feitos do seu jeito!
          </p>
          <div className="bg-red-600 inline-block rounded-lg p-1">
            <p className="text-white font-semibold px-6 py-3 text-lg">
              QUERO FAZER UM PEDIDO!
            </p>
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center space-x-2 mx-auto mt-4">
              <ShoppingBag size={20} />
              <span>Ver Produtos</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">QUALIDADE PREMIUM</h3>
              <p className="text-gray-600">Materiais de primeira linha e acabamento impecável</p>
            </div>

            <div className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AGILIDADE</h3>
              <p className="text-gray-600">Entrega rápida sem comprometer a qualidade</p>
            </div>

            <div className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">DO SEU JEITO</h3>
              <p className="text-gray-600">Personalização completa para suas necessidades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">NOSSOS PRODUTOS</h2>
          <p className="text-center text-gray-600 mb-12">
            Confeccionamos produtos personalizados com a marca JUBS de qualidade
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    JUBS
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-800">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm">
                      Personalizar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">PARCERIAS DE QUALIDADE</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">CLIENTES SATISFEITOS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">PRONTO PARA PERSONALIZAR?</h2>
          <p className="text-xl mb-8">Faça seu cadastro e comece a criar produtos únicos</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              Criar Conta
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Já tenho conta
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">JUBS</h3>
              <p className="text-gray-400">
                Estúdio têxtil especializado em confecção personalizada de roupas, canecas e acessórios.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="text-gray-400 space-y-2">
                <p>📞 (11) 99999-9999</p>
                <p>✉️ contato@jubs.com.br</p>
                <p>📍 São Paulo, SP</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
              <div className="text-gray-400 space-y-2">
                <p>Segunda à Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 12h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 JUBS Estúdio Têxtil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;