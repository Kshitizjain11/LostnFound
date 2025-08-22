import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, X, ShoppingBag, IndianRupee, Search, Filter, Users, Building, MapPin, Clock, Tag, Star, MessageCircle, Heart } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const Marketplace = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Vintage Camera",
      description: "Classic 35mm film camera in excellent condition",
      price: 2500,
      imageUrl: null,
      category: "Electronics",
      seller: "Rajesh Kumar",
      location: "Mumbai",
      college: "IIT Bombay",
      group: "Photography Club",
      type: "selling",
      posted: "2 hours ago",
      condition: "Excellent",
      negotiable: true,
      saved: false,
      rating: 4.8
    },
    {
      id: 2,
      title: "Study Table",
      description: "Wooden study table with drawers, perfect for students",
      price: 1800,
      imageUrl: null,
      category: "Furniture",
      seller: "Priya Sharma",
      location: "Delhi",
      college: "Delhi University",
      group: "Furniture Exchange",
      type: "buying",
      posted: "5 hours ago",
      condition: "Good",
      negotiable: false,
      saved: false,
      rating: 4.5
    },
    {
      id: 3,
      title: "Gaming Headset",
      description: "RGB gaming headset with microphone, barely used",
      price: 1200,
      imageUrl: null,
      category: "Electronics",
      seller: "Amit Patel",
      location: "Bangalore",
      college: "IIM Bangalore",
      group: "Tech Hub",
      type: "selling",
      posted: "1 day ago",
      condition: "Like New",
      negotiable: true,
      saved: false,
      rating: 4.9
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [marketMode, setMarketMode] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [locationFilter, setLocationFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Image preview modal state
  const [imagePreviewModal, setImagePreviewModal] = useState({ open: false, url: null, title: '' });
  
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Electronics',
    location: '',
    college: '',
    group: '',
    type: 'selling',
    condition: 'Good',
    negotiable: false,
    image: null,
    imagePreview: null
  });

  const categories = ['Electronics', 'Furniture', 'Books', 'Clothing', 'Sports', 'Vehicles', 'Home & Garden', 'Other'];
  const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];
  const colleges = ['IIT Bombay', 'Delhi University', 'IIM Bangalore', 'Anna University', 'Jadavpur University'];
  const groups = ['Photography Club', 'Furniture Exchange', 'Tech Hub', 'Book Exchange', 'Sports Club'];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.title && newProduct.price && newProduct.location) {
      const product = {
        id: uuidv4(),
        title: newProduct.title,
        description: newProduct.description,
        price: parseInt(newProduct.price),
        imageUrl: newProduct.imagePreview,
        category: newProduct.category,
        seller: "You",
        location: newProduct.location,
        college: newProduct.college,
        group: newProduct.group,
        type: newProduct.type,
        condition: newProduct.condition,
        negotiable: newProduct.negotiable,
        posted: "Just now",
        rating: 5.0,
        saved: false
      };
      
      setProducts(prev => [product, ...prev]);
      setNewProduct({
        title: '',
        description: '',
        price: '',
        category: 'Electronics',
        location: '',
        college: '',
        group: '',
        type: 'selling',
        condition: 'Good',
        negotiable: false,
        image: null,
        imagePreview: null
      });
      setShowAddForm(false);
    }
  };

  const toggleSaveProduct = (productId) => {
    setProducts(prev => prev.map(product => 
      product.id === productId ? { ...product, saved: !product.saved } : product
    ));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = marketMode === 'all' || product.type === marketMode;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesLocation = locationFilter === 'all' || product.location === locationFilter;
    const matchesCollege = collegeFilter === 'all' || product.college === collegeFilter;
    const matchesGroup = groupFilter === 'all' || product.group === groupFilter;

    return matchesSearch && matchesMode && matchesCategory && matchesPrice && 
           matchesLocation && matchesCollege && matchesGroup;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Campus Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Buy and sell within your college community in ₹
          </p>
        </motion.div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
            <button
              onClick={() => setMarketMode('all')}
              className={`px-4 py-2 rounded-md transition-colors ${
                marketMode === 'all' ? 'bg-purple-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setMarketMode('selling')}
              className={`px-4 py-2 rounded-md transition-colors ${
                marketMode === 'selling' ? 'bg-purple-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Selling
            </button>
            <button
              onClick={() => setMarketMode('buying')}
              className={`px-4 py-2 rounded-md transition-colors ${
                marketMode === 'buying' ? 'bg-purple-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Buying
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      College
                    </label>
                    <select
                      value={collegeFilter}
                      onChange={(e) => setCollegeFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    >
                      <option value="all">All Colleges</option>
                      {colleges.map(college => (
                        <option key={college} value={college}>{college}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Group
                    </label>
                    <select
                      value={groupFilter}
                      onChange={(e) => setGroupFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    >
                      <option value="all">All Groups</option>
                      {groups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price Range
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 50000 }))}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setImagePreviewModal({ open: true, url: product.imageUrl, title: product.title })}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.type === 'selling' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                    }`}>
                      {product.type === 'selling' ? 'SELLING' : 'WANTED'}
                    </span>
                    {product.verified && (
                      <span className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100 px-2 py-1 rounded-full text-xs font-medium">
                        ✓
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleSaveProduct(product.id)}
                    className="absolute top-2 left-2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <Heart size={16} className={`${product.saved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {product.condition}
                    </span>
                    {product.negotiable && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Negotiable
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-purple-600 flex items-center">
                      <IndianRupee size={18} className="mr-1" />
                      {product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <div className="flex items-center gap-1">
                      <Building size={12} />
                      <span>{product.college}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>{product.group}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{product.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{product.posted} • by {product.seller}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg transition-all"
                    >
                      <MessageCircle size={14} className="mr-1 inline" />
                      Chat
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      {product.type === 'selling' ? 'Buy' : 'Sell'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Product Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
        >
          <Plus size={24} />
        </motion.button>

        {/* Enhanced Add Product Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {newProduct.type === 'selling' ? 'Sell Your Item' : 'Post Buying Request'}
                  </h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type
                      </label>
                      <select
                        value={newProduct.type}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      >
                        <option value="selling">Selling</option>
                        <option value="buying">Buying</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Product Image
                    </label>
                    <div
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {newProduct.imagePreview ? (
                        <img
                          src={newProduct.imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="text-purple-600 cursor-pointer hover:text-purple-700"
                      >
                        Click to upload or drag & drop
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                        placeholder={newProduct.type === 'selling' ? "What are you selling?" : "What do you need?"}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                        placeholder="Enter price in INR"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        College
                      </label>
                      <select
                        value={newProduct.college}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, college: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      >
                        <option value="">Select College</option>
                        {colleges.map(college => (
                          <option key={college} value={college}>{college}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Group
                      </label>
                      <select
                        value={newProduct.group}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, group: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      >
                        <option value="">Select Group</option>
                        {groups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Condition
                      </label>
                      <select
                        value={newProduct.condition}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, condition: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      >
                        {conditions.map(condition => (
                          <option key={condition} value={condition}>{condition}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      rows={3}
                      placeholder={newProduct.type === 'selling' ? "Describe your item..." : "Describe what you're looking for..."}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newProduct.location}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      placeholder="e.g., Mumbai, Delhi"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newProduct.negotiable}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, negotiable: e.target.checked }))}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Price negotiable
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {newProduct.type === 'selling' ? 'Post for Sale' : 'Post Buying Request'}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Marketplace;