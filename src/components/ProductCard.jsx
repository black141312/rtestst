import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Eye } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function ProductCard({ product }) {
  const { addToCart, storeConfig } = useStore()

  return (
    <motion.div 
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }} transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.images?.[0] || '/placeholder.jpg'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 hover:text-primary transition">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-primary">
            {storeConfig.currencySymbol}{product.price?.toFixed(2)}
          </span>
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="p-2 bg-primary text-white rounded-full hover:bg-secondary transition"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
