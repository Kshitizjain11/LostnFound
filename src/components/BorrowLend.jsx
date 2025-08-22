import { motion } from 'framer-motion'
import { Handshake, Star, Clock, MapPin } from 'lucide-react'

const BorrowLend = () => {
  const items = [
    {
      id: 1,
      title: 'Scientific Calculator',
      category: 'Electronics',
      type: 'lend',
      user: 'Emma W.',
      rating: 4.8,
      duration: '3 days',
      location: 'Tech Building',
      image: '📱',
      points: 15
    },
    {
      id: 2,
      title: 'Lab Coat',
      category: 'Clothing',
      type: 'borrow',
      user: 'Alex R.',
      rating: 4.9,
      duration: '1 week',
      location: 'Science Lab',
      image: '👔',
      points: 10
    }
  ]

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Borrow & Lend Hub 🤝
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Share resources, build connections, save money together
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="text-4xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-2xl">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.category}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {item.user.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.user}</span>
                  </div>
                  <button className={`px-4 py-2 rounded-xl text-sm font-medium ${
                    item.type === 'lend' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {item.type === 'lend' ? 'Lend' : 'Borrow'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default BorrowLend