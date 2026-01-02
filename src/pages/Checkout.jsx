import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart, storeConfig, sdk } = useStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Create order
      await sdk.orders.create({
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: formData,
        total: cartTotal
      })
      
      clearCart()
      navigate('/order-success')
    } catch (error) {
      alert('Failed to create order: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />
              <input
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />
            </div>
            <input
              placeholder="Address"
              required
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full mt-4 px-4 py-3 border rounded-lg"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              <input
                placeholder="City"
                required
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />
              <input
                placeholder="Postal Code"
                required
                value={formData.postalCode}
                onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />
              <input
                placeholder="Country"
                required
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                className="px-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{storeConfig.currencySymbol}{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-semibold rounded-xl hover:bg-secondary transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Complete Order'}
          </button>
        </form>
      </div>
    </div>
  )
}
