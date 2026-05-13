'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import type { Product } from '@/lib/cms'

export interface CartItem {
  productId: string
  title: string
  price: number
  imageUrl: string
  stripePriceId: string
  quantity: number
  variantLabel?: string
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'INIT'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'INIT':
      return { items: action.items }

    case 'ADD': {
      const existing = state.items.find(i => i.productId === action.item.productId)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.productId === action.item.productId
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        }
      }
      return { items: [...state.items, action.item] }
    }

    case 'REMOVE':
      return { items: state.items.filter(i => i.productId !== action.productId) }

    case 'UPDATE_QTY':
      return {
        items: state.items.map(i =>
          i.productId === action.productId ? { ...i, quantity: action.qty } : i
        ).filter(i => i.quantity > 0),
      }

    case 'CLEAR':
      return { items: [] }

    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  add: (item: CartItem) => void
  remove: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Hydrate depuis localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('velori-cart')
      if (saved) dispatch({ type: 'INIT', items: JSON.parse(saved) })
    } catch {}
  }, [])

  // Persistance
  useEffect(() => {
    localStorage.setItem('velori-cart', JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems,
      totalPrice,
      add: (item) => dispatch({ type: 'ADD', item }),
      remove: (productId) => dispatch({ type: 'REMOVE', productId }),
      updateQty: (productId, qty) => dispatch({ type: 'UPDATE_QTY', productId, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
