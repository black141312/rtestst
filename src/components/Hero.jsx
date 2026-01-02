import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function Hero() {
  const { storeConfig } = useStore()

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Welcome to<br/>{storeConfig.name}
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            {storeConfig.description}
          </p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-secondary transition-all"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
