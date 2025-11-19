export default function Hero() {
  return (
    <section className="pt-28 pb-12 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(0,0,0,0.6),transparent)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-widest text-xs text-gray-500">Artisan Chocolatier</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight">Luxury, hand-crafted chocolates for the modern palate</h1>
            <p className="mt-4 text-gray-600">Small-batch confections made from single-origin cacao, finished by hand, and shipped fresh to your door.</p>
            <a href="#collections" className="inline-block mt-6 bg-black text-white px-5 py-3 rounded-md hover:bg-gray-900">Shop Collections</a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img className="rounded-xl object-cover h-64 w-full" src="https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM1MTI1ODN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"/>
            <img className="rounded-xl object-cover h-64 w-full mt-8" src="https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM1MTI1ODN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"/>
          </div>
        </div>
      </div>
    </section>
  )
}
