import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import { fetchJSON } from './lib/api'

function App() {
  const [products, setProducts] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([]) // {id, name, price_cents, image, quantity}
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(false)
  const [orderInfo, setOrderInfo] = useState(null)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      // seed once then fetch
      try {
        await fetchJSON('/api/seed', { method: 'POST', body: JSON.stringify({ force: false }) })
      } catch (_) {}
      const data = await fetchJSON('/api/products')
      setProducts(data)
      setLoading(false)
    }
    run()
  }, [])

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart])

  const addToCart = (p) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === p.id)
      if (exist) return prev.map((i) => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { id: p.id, name: p.name, price_cents: p.price_cents, image: p.image, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const checkout = async () => {
    setCheckingOut(true)
    try {
      const items = cart.map((i) => ({ product_id: i.id, quantity: i.quantity }))
      const res = await fetchJSON('/api/checkout', { method: 'POST', body: JSON.stringify({ items }) })
      setOrderInfo(res)
      // mock confirm immediately
      const confirm = await fetchJSON('/api/confirm-payment', { method: 'POST', body: JSON.stringify({ order_id: res.order_id, client_secret: res.client_secret, success: true }) })
      if (confirm.status === 'paid') {
        setCart([])
        alert('Payment successful! Your order is confirmed.')
        setCartOpen(false)
      }
    } catch (e) {
      alert('Checkout failed: ' + e.message)
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-gray-900">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <section id="collections" className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl">Signature Collections</h2>
            </div>
            {loading ? (
              <p className="text-gray-600">Loading products…</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="about" className="py-16 border-t border-black/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h3 className="font-serif text-2xl mb-3">Our Craft</h3>
            <p className="text-gray-600">Every piece is tempered, filled, and polished by hand. We source single-origin beans and pair them with seasonal inclusions. Our atelier produces limited runs to ensure absolute freshness.</p>
          </div>
        </section>
      </main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onCheckout={checkout} updating={checkingOut} />
    </div>
  )
}

export default App
