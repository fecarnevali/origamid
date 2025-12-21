import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Search } from 'lucide-react';

export default function FarneShop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);

  // Inicializar dados (em produção, viria de uma API)
  useEffect(() => {
    const initialCategories = [
      { id: 1, name: 'Eletrônicos', slug: 'eletronicos' },
      { id: 2, name: 'Moda', slug: 'moda' },
      { id: 3, name: 'Casa', slug: 'casa' },
      { id: 4, name: 'Esportes', slug: 'esportes' }
    ];

    const initialProducts = [
      { id: 1, name: 'Smartphone XZ', price: 1299.99, category: 1, image: '📱', description: 'Smartphone com 128GB de memória', stock: 15 },
      { id: 2, name: 'Notebook Pro', price: 3499.99, category: 1, image: '💻', description: 'Notebook i7 16GB RAM', stock: 8 },
      { id: 3, name: 'Camiseta Premium', price: 89.90, category: 2, image: '👕', description: 'Camiseta 100% algodão', stock: 50 },
      { id: 4, name: 'Tênis Sport', price: 299.90, category: 4, image: '👟', description: 'Tênis profissional para corrida', stock: 20 },
      { id: 5, name: 'Fone Bluetooth', price: 199.90, category: 1, image: '🎧', description: 'Fone de ouvido sem fio', stock: 30 },
      { id: 6, name: 'Relógio Smart', price: 899.90, category: 1, image: '⌚', description: 'Smartwatch com GPS', stock: 12 }
    ];

    setCategories(initialCategories);
    setProducts(initialProducts);
  }, []);

  // Funções do carrinho
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Farne Shop</h1>
              <p className="text-sm text-blue-100">Sua loja online de confiança</p>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition shadow-md"
            >
              <ShoppingCart className="inline mr-2" size={20} />
              <span className="font-semibold">Carrinho</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ofertas Especiais!</h2>
          <p className="text-xl">Até 50% de desconto em produtos selecionados</p>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Busca e Filtros */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          >
            <option value="all">📦 Todas as Categorias</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="p-6">
                <div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform">
                  {product.image}
                </div>
                <div className="mb-2">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {categories.find(c => c.id === product.category)?.name}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 h-10">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                    {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                >
                  {product.stock === 0 ? '❌ Esgotado' : '🛒 Adicionar ao Carrinho'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl font-semibold">Nenhum produto encontrado</p>
            <p className="text-gray-400 mt-2">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>

      {/* Carrinho Lateral */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800">🛒 Meu Carrinho</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🛍️</div>
                  <p className="text-gray-500 text-lg">Seu carrinho está vazio</p>
                  <p className="text-gray-400 text-sm mt-2">Adicione produtos para continuar</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-blue-600 font-bold">R$ {item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 font-bold"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-lg font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-xl font-semibold">R$ {getTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">R$ {getTotal().toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg shadow-lg">
                      ✅ Finalizar Compra
                    </button>
                    <button 
                      onClick={() => setShowCart(false)}
                      className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Farne Shop</h3>
          <p className="text-gray-400">© 2024 Todos os direitos reservados</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-blue-400 hover:text-blue-300">Sobre</a>
            <a href="#" className="text-blue-400 hover:text-blue-300">Contato</a>
            <a href="#" className="text-blue-400 hover:text-blue-300">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}