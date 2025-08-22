import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MapPin, Calendar, Camera, Sparkles, Trophy, Clock, Upload, X } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

const LostFound = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'found',
      title: 'iPhone 14 Pro Found!',
      description: 'Black iPhone 14 Pro found near library entrance with sparkly case',
      location: 'Main Library',
      date: '2 hours ago',
      image: 'https://m.media-amazon.com/images/I/31irWzsdLsL.jpg',
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
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
      user: 'Mike T.',
      tags: ['bottle', 'personal'],
      urgency: 'medium',
      points: 25
    }
  ])

  const [showPostForm, setShowPostForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    type: 'lost',
    description: '',
    location: '',
    image: null,
    imagePreview: null
  })
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewPost({
          ...newPost,
          image: file,
          imagePreview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setNewPost({
      ...newPost,
      image: null,
      imagePreview: null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newPost.title || !newPost.description || !newPost.location) {
      alert('Please fill in all required fields')
      return
    }

    const newItem = {
      id: uuidv4(),
      type: newPost.type,
      title: newPost.title,
      description: newPost.description,
      location: newPost.location,
      date: 'Just now',
      image: newPost.imagePreview || `https://via.placeholder.com/400x300/6366f1/ffffff?text=${newPost.title}`,
      user: 'You',
      tags: [newPost.type],
      urgency: 'medium',
      points: newPost.type === 'found' ? 50 : 25
    }

    setPosts([newItem, ...posts])
    setNewPost({
      title: '',
      type: 'lost',
      description: '',
      location: '',
      image: null,
      imagePreview: null
    })
    setShowPostForm(false)
  }

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="What did you lose/find?"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <select 
                    value={newPost.type}
                    onChange={(e) => setNewPost({...newPost, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>
                
                <textarea
                  placeholder="Describe the item..."
                  value={newPost.description}
                  onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                  className="w-full mt-4 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  required
                />
                
                <input
                  type="text"
                  placeholder="Where did you lose/find it?"
                  value={newPost.location}
                  onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />

                {/* Image Upload */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload Image
                  </label>
                  
                  {newPost.imagePreview ? (
                    <div className="relative">
                      <img 
                        src={newPost.imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                    >
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    Post Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts Grid with Images */}
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
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    post.type === 'found' 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                      : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                  }`}>
                    {post.type.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
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
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.date}</span>
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LostFound