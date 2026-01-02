import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, storeConfig } = useStore()

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Add some products to get started!</p>
        <Link 
          to="/products"
          className="mt-6 px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-secondary transition"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
              <img 
                src={item.images?.[0] || '/placeholder.jpg'} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-primary font-bold">{storeConfig.currencySymbol}{item.price?.toFixed(2)}</p>
                
                <div className="flex items-center gap-3 mt-2">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 border rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 border rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex justify-between text-lg">
            <span>Subtotal</span>
            <span className="font-bold">{storeConfig.currencySymbol}{cartTotal.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-4 block w-full py-4 bg-primary text-white text-center font-semibold rounded-xl hover:bg-secondary transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
