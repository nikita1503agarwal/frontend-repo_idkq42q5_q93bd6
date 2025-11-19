import { ShoppingCart, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="font-serif text-2xl tracking-tight">Maison Cacao</a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
          <a href="#collections" className="hover:text-black">Collections</a>
          <a href="#about" className="hover:text-black">About</a>
          <a href="#contact" className="hover:text-black">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-black/5">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-black text-white rounded-full w-4 h-4 grid place-items-center">{cartCount}</span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <div className="px-4 py-3 flex flex-col gap-2 text-sm">
            <a href="#collections" className="py-1">Collections</a>
            <a href="#about" className="py-1">About</a>
            <a href="#contact" className="py-1">Contact</a>
          </div>
        </div>
      )}
    </header>
  )
}
