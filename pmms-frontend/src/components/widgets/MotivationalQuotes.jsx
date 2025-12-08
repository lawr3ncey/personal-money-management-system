import React, { useState, useEffect } from 'react';

// 🔴 DUMMY DATA - Replace with Supabase quotes table
const DUMMY_QUOTES = [
  { id: 1, text: "A penny saved is a penny earned.", author: "Benjamin Franklin", category: "saving" },
  { id: 2, text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett", category: "saving" },
  { id: 3, text: "The habit of saving is itself an education; it fosters every virtue, teaches self-denial.", author: "T.T. Munger", category: "discipline" },
  { id: 4, text: "It's not about how much money you make, but how much money you keep.", author: "Robert Kiyosaki", category: "wealth" },
  { id: 5, text: "Save for a rainy day.", author: "Proverb", category: "saving" },
  { id: 6, text: "Money is a terrible master but an excellent servant.", author: "P.T. Barnum", category: "wisdom" },
  { id: 7, text: "The art is not in making money, but in keeping it.", author: "Proverb", category: "wealth" },
  { id: 8, text: "Beware of little expenses; a small leak will sink a great ship.", author: "Benjamin Franklin", category: "discipline" },
  { id: 9, text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.", author: "Dave Ramsey", category: "peace" },
  { id: 10, text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "motivation" }
];

const MotivationalQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(DUMMY_QUOTES[0]);
  const [favorites, setFavorites] = useState([]);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    // 🔴 TODO: Load favorites from Supabase user_favorite_quotes
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Get daily quote based on date
    const today = new Date().getDate();
    const quoteIndex = today % DUMMY_QUOTES.length;
    setCurrentQuote(DUMMY_QUOTES[quoteIndex]);
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * DUMMY_QUOTES.length);
    setCurrentQuote(DUMMY_QUOTES[randomIndex]);
  };

  const toggleFavorite = () => {
    const isFavorited = favorites.some(q => q.id === currentQuote.id);
    let newFavorites;
    
    if (isFavorited) {
      newFavorites = favorites.filter(q => q.id !== currentQuote.id);
    } else {
      newFavorites = [...favorites, currentQuote];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
    // 🔴 TODO: Save to Supabase user_favorite_quotes
  };

  const shareQuote = () => {
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      setShowShare(true);
      setTimeout(() => setShowShare(false), 2000);
    }
  };

  const isFavorited = favorites.some(q => q.id === currentQuote.id);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">💡 Daily Inspiration</h3>
        <button
          onClick={getRandomQuote}
          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
        >
          🔄 New Quote
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg mb-4 relative">
        <div className="text-6xl text-purple-200 absolute top-2 left-4">"</div>
        <p className="text-lg text-gray-700 italic mb-3 pl-8">
          {currentQuote.text}
        </p>
        <p className="text-right text-purple-600 font-semibold">
          — {currentQuote.author}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            {currentQuote.category}
          </span>
          <div className="flex gap-2">
            <button
              onClick={toggleFavorite}
              className={`px-3 py-1 rounded-full text-sm ${
                isFavorited 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isFavorited ? '❤️' : '🤍'} {isFavorited ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={shareQuote}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200"
            >
              📤 Share
            </button>
          </div>
        </div>
      </div>

      {showShare && (
        <div className="text-center text-sm text-green-600 bg-green-50 py-2 rounded">
          ✅ Quote copied to clipboard!
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            ⭐ Your Favorites ({favorites.length})
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {favorites.slice(0, 3).map(quote => (
              <div key={quote.id} className="bg-white p-3 rounded text-sm">
                <p className="text-gray-600 italic">"{quote.text}"</p>
                <p className="text-xs text-purple-600 mt-1">— {quote.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MotivationalQuotes;

// 🔴 IMPLEMENTATION NOTES:
// - Create quotes table in Supabase with text, author, category
// - Create user_favorite_quotes junction table
// - Add daily quote rotation logic
// - Implement share functionality for social media
