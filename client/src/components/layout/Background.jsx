export default function Background() {
  return (
    <>
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="fixed top-0 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-slate-400/10 rounded-full blur-3xl"></div>
    </>
  )
}
