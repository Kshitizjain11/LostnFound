import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Bell, MessageSquare, PlusCircle, Star, Settings, Pin, ChevronDown, Send, Smile, Image as ImageIcon, PlusSquare, Award, Calendar, Clipboard, Shield, CheckCircle, TrendingUp, Clock, Filter, Hash, AtSign, Heart, ThumbsUp, MessageCircle, Flag, Crown } from 'lucide-react';

const Groups = () => {
  // State management
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'CSE Department',
      category: 'institution',
      type: 'College A → CSE',
      members: 156,
      isVerified: true,
      trustScore: 4.8,
      description: 'Official group for Computer Science Department',
      image: 'https://via.placeholder.com/150',
      isPrivate: false,
      moderators: ['admin1', 'admin2'],
      trustLeaderboard: [
        { user: 'Alice', score: 98, items: 45 },
        { user: 'Bob', score: 95, items: 38 }
      ]
    },
    {
      id: 2,
      name: 'Hostel 1',
      category: 'location',
      type: 'College A → Hostel',
      members: 200,
      isVerified: true,
      trustScore: 4.5,
      description: 'Hostel 1 community group',
      image: 'https://via.placeholder.com/150',
      isPrivate: true,
      moderators: ['hostelAdmin'],
      trustLeaderboard: [
        { user: 'Charlie', score: 92, items: 52 },
        { user: 'David', score: 89, items: 41 }
      ]
    },
    {
      id: 3,
      name: 'Tech Enthusiasts',
      category: 'interest',
      type: 'Interest Group',
      members: 89,
      isVerified: false,
      trustScore: 4.2,
      description: 'For tech lovers and gadget enthusiasts',
      image: 'https://via.placeholder.com/150',
      isPrivate: false,
      moderators: ['techAdmin'],
      trustLeaderboard: [
        { user: 'Eve', score: 85, items: 28 },
        { user: 'Frank', score: 82, items: 35 }
      ]
    }
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Alice',
      text: 'Found a calculator in Lab 3!',
      time: '2:30 PM',
      reactions: ['👍', '❤️'],
      replies: [],
      isPinned: true,
      type: 'lost-found'
    },
    {
      id: 2,
      sender: 'Bob',
      text: 'Anyone has a spare lab coat for tomorrow?',
      time: '3:15 PM',
      reactions: ['👍'],
      replies: [
        { sender: 'Charlie', text: 'I have one!', time: '3:20 PM' }
      ],
      type: 'borrow-lend'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showPollModal, setShowPollModal] = useState(false);
  const [showJoinRequestModal, setShowJoinRequestModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showTrustModal, setShowTrustModal] = useState(false);
  
  const [newGroup, setNewGroup] = useState({
    name: '',
    category: 'institution',
    description: '',
    isPrivate: false,
    eventMode: false,
    eventEndDate: ''
  });

  const [poll, setPoll] = useState({
    question: '',
    options: ['', ''],
    duration: '24h'
  });

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Exam Tomorrow', content: 'Lab coats available for borrow', isSticky: true, date: '2024-01-15' },
    { id: 2, title: 'Group Meeting', content: 'Meeting at 5 PM in Lab 2', isSticky: false, date: '2024-01-14' }
  ]);

  const [lostFoundItems, setLostFoundItems] = useState([
    { id: 1, type: 'found', item: 'Calculator', location: 'Lab 3', date: '2024-01-15', image: 'https://via.placeholder.com/100', status: 'available' },
    { id: 2, type: 'lost', item: 'ID Card', location: 'Canteen', date: '2024-01-14', image: 'https://via.placeholder.com/100', status: 'pending' }
  ]);

  const [borrowLendItems, setBorrowLendItems] = useState([
    { id: 1, type: 'lend', item: 'Lab Coat', duration: '1 day', lender: 'Alice', trustScore: 98 },
    { id: 2, type: 'borrow', item: 'Calculator', duration: '3 hours', borrower: 'Bob', trustScore: 95 }
  ]);

  const [marketplaceItems, setMarketplaceItems] = useState([
    { id: 1, item: 'Used Laptop', price: 25000, seller: 'Charlie', condition: 'Good', image: 'https://via.placeholder.com/100' },
    { id: 2, item: 'Textbook Set', price: 800, seller: 'David', condition: 'Like New', image: 'https://via.placeholder.com/100' }
  ]);

  const [userPreferences, setUserPreferences] = useState(['lab coat', 'calculator', 'textbook']);
  const [showNotifications, setShowNotifications] = useState(true);

  const chatRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Filter groups
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || group.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Send message
  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString(),
        reactions: [],
        replies: [],
        isPinned: false,
        type: activeTab
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      // AI suggestion simulation
      if (newMessage.toLowerCase().includes('lost') || newMessage.toLowerCase().includes('found')) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            sender: 'AI Assistant',
            text: '🤖 AI: Found potential matches for your item! Check Lost & Found tab.',
            time: new Date().toLocaleTimeString(),
            reactions: [],
            replies: [],
            isBot: true
          }]);
        }, 1000);
      }
    }
  };

  // Create group
  const createGroup = () => {
    const group = {
      id: Date.now(),
      name: newGroup.name,
      category: newGroup.category,
      type: `${newGroup.category === 'institution' ? 'College' : newGroup.category === 'location' ? 'Location' : 'Interest'} → ${newGroup.name}`,
      members: 1,
      isVerified: false,
      trustScore: 5.0,
      description: newGroup.description,
      image: 'https://via.placeholder.com/150',
      isPrivate: newGroup.isPrivate,
      moderators: ['You'],
      trustLeaderboard: [{ user: 'You', score: 100, items: 0 }]
    };
    
    setGroups([...groups, group]);
    setShowCreateModal(false);
    setNewGroup({ name: '', category: 'institution', description: '', isPrivate: false, eventMode: false });
  };

  // Request to join group
  const requestJoin = (group) => {
    if (group.isPrivate) {
      setShowJoinRequestModal(true);
    } else {
      setSelectedGroup(group);
    }
  };

  // Pin message
  const pinMessage = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg
    ));
  };

  // Add reaction
  const addReaction = (messageId, emoji) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...msg.reactions, emoji] }
        : msg
    ));
  };

  // Daily summary simulation
  const dailySummary = {
    found: 3,
    borrowed: 2,
    sold: 1,
    newMembers: 5
  };

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'lost-found', label: 'Lost & Found', icon: Search },
    { id: 'borrow-lend', label: 'Borrow/Lend', icon: Users },
    { id: 'marketplace', label: 'Buy/Sell', icon: PlusSquare },
    { id: 'announcements', label: 'Announcements', icon: Clipboard },
    { id: 'polls', label: 'Polls', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {!selectedGroup ? (
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Community Groups</h1>
            <p className="text-gray-600 dark:text-gray-300">Connect with your college, hostel, or interest groups</p>
          </motion.div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search groups..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="institution">🏫 Institution</option>
                <option value="location">📍 Location</option>
                <option value="interest">❤️ Interest</option>
              </select>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PlusCircle size={20} className="mr-2" /> Create Group
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                onClick={() => requestJoin(group)}
              >
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  <img src={group.image} alt={group.name} className="w-full h-full object-cover opacity-80" />
                  {group.isVerified && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                      <CheckCircle size={16} />
                    </div>
                  )}
                  {group.isPrivate && (
                    <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                      <Shield size={12} className="inline mr-1" /> Private
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{group.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{group.type}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                      <Users size={14} className="mr-1" /> {group.members} members
                    </span>
                    <span className="flex items-center text-yellow-500">
                      <Star size={14} className="mr-1" /> {group.trustScore}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{group.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        requestJoin(group);
                      }}
                      className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                    >
                      {group.isPrivate ? 'Request to Join' : 'Join Group'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTrustModal(true);
                      }}
                      className="text-gray-500 hover:text-gray-600 text-sm"
                    >
                      <Award size={14} className="inline mr-1" /> Leaderboard
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Group Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="text-white hover:text-gray-200"
                >
                  <ChevronDown size={24} />
                </button>
                <img src={selectedGroup.image} alt={selectedGroup.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h2 className="text-xl font-semibold">{selectedGroup.name}</h2>
                  <p className="text-sm opacity-90">{selectedGroup.members} members • Trust Score: {selectedGroup.trustScore}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-gray-200">
                  <Bell size={20} />
                </button>
                <button className="text-white hover:text-gray-200">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b dark:border-gray-700 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="h-[calc(100vh-200px)] flex flex-col">
            {/* Chat Area */}
            {activeTab === 'chat' && (
              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'You' 
                        ? 'bg-blue-500 text-white' 
                        : message.isBot 
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {message.sender !== 'You' && (
                        <p className="text-xs font-medium mb-1 opacity-75">{message.sender}</p>
                      )}
                      <p className="text-sm">{message.text}</p>
                      {message.image && (
                        <img 
                          src={message.image} 
                          alt="Shared" 
                          className="mt-2 rounded-md max-w-full cursor-pointer hover:opacity-90"
                          onClick={() => {
                            setSelectedImage(message.image);
                            setShowImageModal(true);
                          }}
                        />
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => addReaction(message.id, '👍')}
                            className="text-xs opacity-75 hover:opacity-100"
                          >
                            👍 {message.reactions.filter(r => r === '👍').length}
                          </button>
                          <button 
                            onClick={() => addReaction(message.id, '❤️')}
                            className="text-xs opacity-75 hover:opacity-100"
                          >
                            ❤️ {message.reactions.filter(r => r === '❤️').length}
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => pinMessage(message.id)}
                            className="text-xs opacity-75 hover:opacity-100"
                          >
                            <Pin size={12} />
                          </button>
                          <span className="text-xs opacity-75">{message.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Lost & Found Tab */}
            {activeTab === 'lost-found' && (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Lost & Found Items</h3>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Add Item</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lostFoundItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.item} className="w-16 h-16 rounded" />
                        <div>
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-gray-600">{item.location}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.type === 'found' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Borrow/Lend Tab */}
            {activeTab === 'borrow-lend' && (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Borrow/Lend Items</h3>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Post Request</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {borrowLendItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-gray-600">Duration: {item.duration}</p>
                          <p className="text-sm text-gray-600">{item.type === 'lend' ? 'Lender' : 'Borrower'}: {item[item.type === 'lend' ? 'lender' : 'borrower']}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">Trust: {item.trustScore}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Marketplace Tab */}
            {activeTab === 'marketplace' && (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Group Marketplace</h3>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Sell Item</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketplaceItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <img src={item.image} alt={item.item} className="w-full h-32 object-cover rounded mb-2" />
                      <p className="font-medium">{item.item}</p>
                      <p className="text-lg font-bold text-green-600">₹{item.price}</p>
                      <p className="text-sm text-gray-600">Seller: {item.seller}</p>
                      <p className="text-sm text-gray-600">Condition: {item.condition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Announcements</h3>
                  <button 
                    onClick={() => setShowAnnouncementModal(true)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Add Announcement
                  </button>
                </div>
                <div className="space-y-3">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className={`border rounded-lg p-4 ${
                      announcement.isSticky ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200' : ''
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{announcement.title}</h4>
                          <p className="text-sm text-gray-600">{announcement.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                        </div>
                        {announcement.isSticky && (
                          <Pin size={16} className="text-yellow-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Polls Tab */}
            {activeTab === 'polls' && (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Polls & Surveys</h3>
                  <button 
                    onClick={() => setShowPollModal(true)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Create Poll
                  </button>
                </div>
                <div className="text-center py-8 text-gray-500">
                  No active polls. Create your first poll!
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Trust Leaderboard</h3>
                <div className="space-y-3">
                  {selectedGroup?.trustLeaderboard?.map((user, index) => (
                    <div key={user.user} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-lg">#{index + 1}</span>
                        <span>{user.user}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{user.score} points</p>
                        <p className="text-sm text-gray-600">{user.items} items</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            {activeTab === 'chat' && (
              <div className="p-4 border-t dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <Smile size={20} />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <ImageIcon size={20} />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="p-2 text-blue-500 hover:text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Group</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Group Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newGroup.category}
                  onChange={(e) => setNewGroup({ ...newGroup, category: e.target.value })}
                >
                  <option value="institution">🏫 Institution</option>
                  <option value="location">📍 Location</option>
                  <option value="interest">❤️ Interest</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={newGroup.isPrivate}
                    onChange={(e) => setNewGroup({ ...newGroup, isPrivate: e.target.checked })}
                  />
                  Private Group
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={newGroup.eventMode}
                    onChange={(e) => setNewGroup({ ...newGroup, eventMode: e.target.checked })}
                  />
                  Event Mode
                </label>
              </div>
              {newGroup.eventMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newGroup.eventEndDate}
                    onChange={(e) => setNewGroup({ ...newGroup, eventEndDate: e.target.value })}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={createGroup}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create Group
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={() => setShowImageModal(false)}>
          <img src={selectedImage} alt="Full size" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}

      {/* Daily Summary Notification */}
      <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center space-x-2">
          <TrendingUp size={20} />
          <div>
            <p className="font-medium">Daily Summary</p>
            <p className="text-sm opacity-90">
              📊 {dailySummary.found} found • 🤝 {dailySummary.borrowed} borrowed • 💰 {dailySummary.sold} sold
            </p>
          </div>
          <button onClick={() => setShowNotifications(false)} className="ml-2">
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Groups;