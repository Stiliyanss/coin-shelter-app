import { useState, useEffect } from 'react'

function EditCoin({ coin, onUpdateCoin, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    material: '',
    price: '',
    description: '',
    mint: '',
    country: '',
    year: '',
    weight: '',
    diameter: '',
    certificate: false,
    pieces: ''
  })

  useEffect(() => {
    if (coin) {
      setFormData({
        name: coin.name || '',
        image: coin.image || '',
        material: coin.material || '',
        price: coin.price || '',
        description: coin.description || '',
        mint: coin.mint || '',
        country: coin.country || '',
        year: coin.year || '',
        weight: coin.weight || '',
        diameter: coin.diameter || '',
        certificate: coin.certificate || false,
        pieces: coin.pieces || ''
      })
    }
  }, [coin])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.material && formData.price) {
     onUpdateCoin({
  ...formData,
  price: formData.price === '' ? null : Number(formData.price),
  year: formData.year === '' ? null : Number(formData.year),
  weight: formData.weight === '' ? null : Number(formData.weight),
  diameter: formData.diameter === '' ? null : Number(formData.diameter),
  pieces: formData.pieces === '' ? null : Number(formData.pieces),
  certificate: !!formData.certificate,
  id: coin?.id
})

    }
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light tracking-wide text-white/90">
              Edit Coin
            </h2>
            <button
              onClick={onCancel}
              className="text-white/40 hover:text-white/70 transition-colors text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                placeholder="e.g., 1921 Morgan Silver Dollar"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                placeholder="https://example.com/coin-image.jpg"
              />
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-white/10"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Material */}
            <div>
              <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                Material
              </label>
              <select
                name="material"
                value={formData.material}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
              >
                <option value="" className="bg-black">Select material</option>
                <option value="Gold" className="bg-black">Gold</option>
                <option value="Silver" className="bg-black">Silver</option>
                <option value="Platinum" className="bg-black">Platinum</option>
                <option value="Copper" className="bg-black">Copper</option>
                <option value="Other" className="bg-black">Other</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                Price (€)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                placeholder="0.00"
              />
            </div>

            {/* Mint and Country - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                  Mint
                </label>
                <input
                  type="text"
                  name="mint"
                  value={formData.mint}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="e.g., US Mint"
                />
              </div>
              <div>
                <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="e.g., United States"
                />
              </div>
            </div>

            {/* Year, Weight, Diameter - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="0"
                  max="9999"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="e.g., 1921"
                />
              </div>
              <div>
                <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                  Weight (g)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="e.g., 26.73"
                />
              </div>
              <div>
                <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                  Diameter (mm)
                </label>
                <input
                  type="number"
                  name="diameter"
                  value={formData.diameter}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="e.g., 38.1"
                />
              </div>
            </div>

            {/* Pieces and Certificate - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                  Pieces
                </label>
                <input
                  type="number"
                  name="pieces"
                  value={formData.pieces}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="e.g., 1"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="certificate"
                    checked={formData.certificate}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-amber-400 focus:ring-amber-400/50 focus:ring-offset-0 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-xs font-light tracking-widest uppercase text-white/50 group-hover:text-white/70 transition-colors">
                    Has Certificate
                  </span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                placeholder="Additional details about the coin..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-lg"
              >
                <span className="text-sm font-light tracking-widest uppercase text-white/70">
                  Cancel
                </span>
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 border border-amber-400/50 bg-amber-400/10 hover:bg-amber-400/20 hover:border-amber-400/70 transition-all duration-300 rounded-lg"
              >
                <span className="text-sm font-light tracking-widest uppercase text-white/90">
                  Update Coin
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCoin
