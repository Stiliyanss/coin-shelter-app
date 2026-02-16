import Login from './Login'
import Register from './Register'

export default function AuthModal({
  isOpen,
  authPage,
  onClose,
  onAuthSuccess,
  onSwitchToLogin,
  onSwitchToRegister,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-black border border-white/10 rounded-2xl max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors text-2xl leading-none z-10"
        >
          ×
        </button>

        {authPage === 'login' ? (
          <Login
            onAuthSuccess={onAuthSuccess}
            onSwitchToRegister={onSwitchToRegister}
          />
        ) : (
          <Register
            onAuthSuccess={onAuthSuccess}
            onSwitchToLogin={onSwitchToLogin}
          />
        )}
      </div>
    </div>
  )
}
