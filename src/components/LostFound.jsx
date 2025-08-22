import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MapPin, Calendar, Camera, Sparkles, Trophy, Clock } from 'lucide-react'

const LostFound = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'found',
      title: 'iPhone 14 Pro Found!',
      description: 'Black iPhone 14 Pro found near library entrance with sparkly case',
      location: 'Main Library',
      date: '2 hours ago',
      image: null,
      user: 'Sarah M.',
      tags: ['electronics', 'phone'],
      urgency: 'high',
      points: 50
    },
    {
      id: 2,
      type: 'lost',
      title: 'Blue Water Bottle',
      description: 'Nalgene bottle with adventure stickers - my hiking buddy!',
      location: 'Gymnasium',
      date: '1 day ago',
      image: null,
      user: 'Mike T.',
      tags: ['bottle', 'personal'],
      urgency: 'medium',
      points: 25
    }
  ])

  const [showPostForm, setShowPostForm] = useState(false)

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-8 text-white"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Find What Matters 💝</h2>
          <p className="text-lg opacity-90 mb-6">
            Join thousands helping each other find lost items and make our community stronger
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span className="text-sm">Earn 25-100 points per return</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">AI-powered matching</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Post Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Recent Posts
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {posts.length} items waiting to find their owners
          </p>
        </div>
        
        <motion.button
          onClick={() => setShowPostForm(!showPostForm)}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 font-medium hover:shadow-lg transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Post Item</span>
          </span>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
        </motion.button>
      </div>

      {/* Post Form */}
      <AnimatePresence>
        {showPostForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Share Your Post ✨
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="What did you lose/find?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Lost</option>
                  <option>Found</option>
                </select>
              </div>
              <textarea
                placeholder="Describe the item..."
                className="w-full mt-4 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
              <div className="mt-4 flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                  <Camera className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Add Location</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  post.type === 'found' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                    : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                }`}>
                  {post.type.toUpperCase()}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent bg-gradient-to-r bg-clip-text from-purple-600 to-pink-600">
                {post.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {post.description}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{post.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {post.user.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{post.user}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm font-medium text-purple-600 dark:text-purple-400">
                  <Trophy className="w-4 h-4" />
                  <span>+{post.points} pts</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LostFound