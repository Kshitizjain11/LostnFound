import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Handshake, Star, Clock, MapPin, Plus, Upload, X, Calendar } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

const BorrowLend = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Scientific Calculator',
      category: 'Electronics',
      type: 'lend',
      user: 'Emma W.',
      rating: 4.8,
      duration: '3 days',
      location: 'Tech Building',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop',
      points: 15,
      description: 'TI-84 Plus calculator, perfect for math exams'
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
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      points: 10,
      description: 'Clean white lab coat, size M'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    category: '',
    type: 'lend',
    duration: '',
    location: '',
    description: '',
    image: null,
    imagePreview: null
  })
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewItem({
          ...newItem,
          image: file,
          imagePreview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setNewItem({
      ...newItem,
      image: null,
      imagePreview: null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem.title || !newItem.category || !newItem.location || !newItem.duration) {
      alert('Please fill in all required fields')
      return
    }

    const newItemData = {
      id: uuidv4(),
      title: newItem.title,
      category: newItem.category,
      type: newItem.type,
      user: 'You',
      rating: 5.0,
      duration: newItem.duration,
      location: newItem.location,
      image: newItem.imagePreview || `https://via.placeholder.com/400x300/10b981/ffffff?text=${newItem.title}`,
      points: newItem.type === 'lend' ? 15 : 10,
      description: newItem.description
    }

    setItems([newItemData, ...items])
    setNewItem({
      title: '',
      category: '',
      type: 'lend',
      duration: '',
      location: '',
      description: '',
      image: null,
      imagePreview: null
    })
    setShowAddForm(false)
  }

  const categories = ['Electronics', 'Books', 'Clothing', 'Sports', 'Tools', 'Other']

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

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Available Items
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {items.length} items ready to share
          </p>
        </div>
        
        <motion.button
          onClick={() => setShowAddForm(!showAddForm)}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 font-medium hover:shadow-lg transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </span>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
        </motion.button>
      </div>

      {/* Add Item Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Share Your Item 🤝
              </h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <select 
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select 
                    value={newItem.type}
                    onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="lend">Lend</option>
                    <option value="borrow">Borrow</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Duration (e.g., 3 days, 1 week)"
                    value={newItem.duration}
                    onChange={(e) => setNewItem({...newItem, duration: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Location"
                  value={newItem.location}
                  onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <textarea
                  placeholder="Description (optional)"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={2}
                />

                {/* Image Upload */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload Image
                  </label>
                  
                  {newItem.imagePreview ? (
                    <div className="relative">
                      <img 
                        src={newItem.imagePreview} 
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
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
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
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    Add Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
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

      {/* Items Grid */}
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
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    item.type === 'lend' 
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white' 
                      : 'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
                  }`}>
                    {item.type.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {item.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-4">
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
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {item.user.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.user}</span>
                  </div>
                  <button className={`px-4 py-2 rounded-xl text-sm font-medium ${
                    item.type === 'lend' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}>
                    {item.type === 'lend' ? 'Request' : 'Offer'}
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