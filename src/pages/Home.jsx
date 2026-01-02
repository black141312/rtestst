import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

export default function Home() {
  const { products, categories, loading, storeConfig } = useStore()
  const featuredProducts = products.slice(0, 8)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Hero />
      
      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      
      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(cat => (
                <a 
                  key={cat.id} 
                  href={`/products?category=${cat.id}`}
                  className="p-6 bg-white rounded-xl text-center hover:shadow-lg transition"
                >
                  <span className="font-medium">{cat.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      
      {/* Newsletter */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 opacity-90">Subscribe to our newsletter for exclusive offers and updates.</p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </motion.div>
  )
}
