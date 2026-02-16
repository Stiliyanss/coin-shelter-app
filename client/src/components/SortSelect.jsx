export default function SortSelect({ value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="block text-xs font-light tracking-widest uppercase text-white/40 mb-2">
        Sort by
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
      >
        <option value="none" className="bg-black">Default</option>
        <option value="price_asc" className="bg-black">Price: Low → High</option>
        <option value="price_desc" className="bg-black">Price: High → Low</option>
        <option value="date_desc" className="bg-black">Purchase date: New → Old</option>
        <option value="date_asc" className="bg-black">Purchase date: Old → New</option>
      </select>
    </div>
  )
}
