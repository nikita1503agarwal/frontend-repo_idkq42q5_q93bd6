import { X } from 'lucide-react'

export default function CartDrawer({ open, onClose, items, onCheckout, updating }) {
  const subtotal = items.reduce((sum, it) => sum + it.price_cents * it.quantity, 0)
  const formatted = (cents) => (cents / 100).toFixed(2)

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      {/* overlay */}
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      {/* panel */}
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-4 h-[calc(100%-180px)] overflow-auto">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex gap-3">
                  <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{it.name}</p>
                    <p className="text-sm text-gray-600">Qty {it.quantity} • ${(it.price_cents/100).toFixed(2)}</p>
                  </div>
                  <div className="text-right font-medium">${formatted(it.price_cents * it.quantity)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${formatted(subtotal)}</span>
          </div>
          <button disabled={items.length===0 || updating} onClick={onCheckout} className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 disabled:opacity-50">
            {updating ? 'Processing…' : 'Checkout'}
          </button>
        </div>
      </aside>
    </div>
  )
}
