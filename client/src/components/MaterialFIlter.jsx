export default function MaterialFilter({ value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="block text-xs font-light tracking-widest uppercase text-white/40 mb-2">
        Material
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
      >
        <option value="all" className="bg-black">All</option>
        <option value="gold" className="bg-black">Gold</option>
        <option value="silver" className="bg-black">Silver</option>
        <option value="platinum" className="bg-black">Platinum</option>
        <option value="copper" className="bg-black">Copper</option>
        <option value="other" className="bg-black">Other</option>
      </select>
    </div>
  )
}
