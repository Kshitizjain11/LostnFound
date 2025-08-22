import { motion } from 'framer-motion'
import { Search, Handshake, ShoppingBag, Users, Sparkles } from 'lucide-react'

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'lostfound', label: 'Lost & Found', icon: Search, color: 'from-blue-500 to-cyan-500' },
    { id: 'borrow', label: 'Borrow/Lend', icon: Handshake, color: 'from-green-500 to-emerald-500' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, color: 'from-purple-500 to-pink-500' },
    { id: 'groups', label: 'Groups', icon: Users, color: 'from-orange-500 to-red-500' },
  ]

  return (
    <nav className="relative">
      <div className="flex space-x-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-2 border border-white/30">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl`}
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <Icon className="relative z-10 w-5 h-5" />
              <span className="relative z-10">{tab.label}</span>
              
              {tab.id === 'lostfound' && (
                <Sparkles className="relative z-10 w-4 h-4 ml-1 text-yellow-300" />
              )}
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation