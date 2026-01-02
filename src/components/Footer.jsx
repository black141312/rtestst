import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Footer() {
  const { storeConfig } = useStore()
  
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">{storeConfig.name}</h3>
            <p className="text-gray-400 text-sm">{storeConfig.description}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/products" className="hover:text-white">All Products</Link></li>
              <li><Link to="/products?new=true" className="hover:text-white">New Arrivals</Link></li>
              <li><Link to="/products?sale=true" className="hover:text-white">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">
              {storeConfig.contact.email}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} {storeConfig.name}. Powered by EpicMerch.</p>
        </div>
      </div>
    </footer>
  )
}
