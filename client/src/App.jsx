import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

import Background from './components/Background'
import Header from './components/Header'
import AddCoin from './components/AddCoin'
import EditCoin from './components/EditCoin'
import Catalog from './components/Catalog'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [coins, setCoins] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [coinToEdit, setCoinToEdit] = useState(null)
  const [currentPage, setCurrentPage] = useState('home') // 'home' or 'catalog'
  const [authPage, setAuthPage] = useState('login') // 'login' or 'register'
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Supabase auth state
  const [session, setSession] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  const isAuthenticated = !!session
  const displayName =
    session?.user?.user_metadata?.name ||
    session?.user?.email ||
    ''

  // 1) Persistent session + auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
      setIsAuthLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null)
    })

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  // 2) Load coins once per login
  useEffect(() => {
    const userId = session?.user?.id
    if (!userId) return

    const fetchCoins = async () => {
      const { data, error } = await supabase
        .from('coins')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching coins:', error.message)
        return
      }

      setCoins(data ?? [])
    }

    fetchCoins()
  }, [session?.user?.id])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setShowAuthModal(false)
    setAuthPage('login')
    // Keep coins visible for guest view (same behavior you had before).
    // If you want coins cleared on logout, uncomment:
    // setCoins([])
  }

  const handleAddCoin = async (coin) => {
  const userId = session?.user?.id
  if (!userId) {
    alert('You must be logged in to add coins.')
    return
  }

  const payload = {
    user_id: userId,
    name: coin.name,
    image: coin.image || null,
    material: coin.material || null,
    price: coin.price === '' ? null : Number(coin.price),
    purchased_at: coin.purchased_at || null,
    description: coin.description || null,
    mint: coin.mint || null,
    country: coin.country || null,
    year: coin.year === '' ? null : Number(coin.year),
    weight: coin.weight === '' ? null : Number(coin.weight),
    diameter: coin.diameter === '' ? null : Number(coin.diameter),
    certificate: coin.certificate || null,
    pieces: coin.pieces === '' ? null : Number(coin.pieces)
  }

  const { data, error } = await supabase
    .from('coins')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    console.error('Insert error:', error.message)
    alert(error.message)
    return
  }

  setCoins((prev) => [data, ...prev])
  setShowAddForm(false)
}


  const handleUpdateCoin = async (updatedCoin) => {
  const payload = {
    name: updatedCoin.name,
    image: updatedCoin.image || null,
    material: updatedCoin.material || null,
    price: updatedCoin.price === '' ? null : Number(updatedCoin.price),
    purchased_at: updatedCoin.purchased_at || null,
    description: updatedCoin.description || null,
    mint: updatedCoin.mint || null,
    country: updatedCoin.country || null,
    year: updatedCoin.year === '' ? null : Number(updatedCoin.year),
    weight: updatedCoin.weight === '' ? null : Number(updatedCoin.weight),
    diameter: updatedCoin.diameter === '' ? null : Number(updatedCoin.diameter),
    certificate: !!updatedCoin.certificate,
    pieces: updatedCoin.pieces === '' ? null : Number(updatedCoin.pieces),
  }

  const { data, error } = await supabase
    .from('coins')
    .update(payload)
    .eq('id', updatedCoin.id)
    .select('*')
    .single()

  if (error) {
    alert(error.message)
    return
  }

  setCoins((prev) => prev.map((c) => (c.id === data.id ? data : c)))
  setShowEditForm(false)
  setCoinToEdit(null)
}



  const handleDeleteCoin = async (coinId) => {
  if (!window.confirm('Are you sure you want to delete this coin?')) return

  const { error } = await supabase
    .from('coins')
    .delete()
    .eq('id', coinId)

  if (error) {
    console.error('Delete error:', error.message)
    alert(error.message)
    return
  }

  setCoins((prev) => prev.filter((c) => c.id !== coinId))
}


  const handleEditCoin = (coin) => {
    setCoinToEdit(coin)
    setShowEditForm(true)
  }

  const handleCloseAuth = () => {
    setShowAuthModal(false)
    setAuthPage('login')
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    setAuthPage('login')
  }

  return (
    <div className="min-h-screen bg-black text-white">
    
    <Background/>

      <div className="relative z-10">
        <Header
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  isAuthenticated={isAuthenticated}
  isAuthLoading={isAuthLoading}
  displayName={displayName}
  onAddCoin={() => isAuthenticated && setShowAddForm(true)}
  onLogin={() => setShowAuthModal(true)}
  onLogout={handleLogout}
/>


        <main>
          {currentPage === 'home' ? (
            <div className="max-w-6xl mx-auto px-6 py-16">
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-3xl font-light tracking-wide text-white/80 mb-4">
                  Welcome to Coins Shelter
                </h2>
                <p className="text-sm text-white/40 font-light tracking-wide max-w-sm mb-12 leading-relaxed">
                  Manage your coin collection with ease. Add coins, view your catalog, and keep track of your valuable collection.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                  <button
                  onClick={() => isAuthenticated && setShowAddForm(true)}
  disabled={!isAuthenticated}
  className={`w-full sm:w-auto group relative px-8 py-3 border backdrop-blur-sm transition-all duration-300
    ${isAuthenticated
      ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-400/50'
      : 'border-white/10 bg-white/5 opacity-40 cursor-not-allowed'
    }`}
                  >
                    <span className="text-sm font-light tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                      Add Coin
                    </span>
                  </button>
                  {coins.length > 0 && (
                    <button
                      onClick={() => setCurrentPage('catalog')}
                      className="w-full sm:w-auto group relative px-8 py-3 border border-amber-400/50 bg-amber-400/10 hover:bg-amber-400/20 hover:border-amber-400/70 transition-all duration-300"
                    >
                      <span className="text-sm font-light tracking-widest uppercase text-white/90">
                        View Catalog
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Catalog
              coins={coins}
              onAddCoin={() => setShowAddForm(true)}
              onEditCoin={handleEditCoin}
              onDeleteCoin={handleDeleteCoin}
            />
          )}
        </main>
      </div>

      {showAddForm && (
        <AddCoin
          onAddCoin={handleAddCoin}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && coinToEdit && (
        <EditCoin
          coin={coinToEdit}
          onUpdateCoin={handleUpdateCoin}
          onCancel={() => {
            setShowEditForm(false)
            setCoinToEdit(null)
          }}
        />
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-black border border-white/10 rounded-2xl max-w-md w-full">
            <button
              onClick={handleCloseAuth}
              className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors text-2xl leading-none z-10"
            >
              ×
            </button>

            {authPage === 'login' ? (
              <Login
                onAuthSuccess={handleAuthSuccess}
                onSwitchToRegister={() => setAuthPage('register')}
              />
            ) : (
              <Register
                onAuthSuccess={handleAuthSuccess}
                onSwitchToLogin={() => setAuthPage('login')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
