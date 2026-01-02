import { createContext, useContext, useReducer, useEffect } from 'react'
import { EpicMerch } from 'epicmerch'
import storeConfig from '../config/store.config'

const StoreContext = createContext()

const sdk = new EpicMerch({
  apiKey: storeConfig.api.key,
  apiUrl: storeConfig.api.endpoint
})

const initialState = {
  products: [],
  categories: [],
  cart: [],
  loading: false,
  error: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload }
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'ADD_TO_CART':
      const existing = state.cart.find(item => item.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { data } = await sdk.products.list()
      dispatch({ type: 'SET_PRODUCTS', payload: data.products || [] })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await sdk.categories.list()
      dispatch({ type: 'SET_CATEGORIES', payload: data || [] })
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const cartTotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <StoreContext.Provider value={{
      ...state,
      sdk,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      storeConfig
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
