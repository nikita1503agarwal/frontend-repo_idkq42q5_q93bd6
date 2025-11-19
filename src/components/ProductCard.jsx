export default function ProductCard({ product, onAdd }) {
  const price = (product.price_cents / 100).toFixed(2)
  return (
    <div className="group rounded-xl overflow-hidden border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform"/>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">${price}</p>
            {product.cacao_percent && (
              <p className="text-xs text-gray-500">{product.cacao_percent}% cacao</p>
            )}
          </div>
        </div>
        <button onClick={() => onAdd(product)} className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-colors">Add to cart</button>
      </div>
    </div>
  )
}
