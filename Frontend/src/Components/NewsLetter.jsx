import React, { useState } from 'react';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Never Miss a <span className="text-primary">Deal!</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Subscribe to get the latest offers, new arrivals, and exclusive discounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Subscription Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
            {isSubscribed ? (
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg mb-6">
                <p className="text-green-700 font-medium text-center">
                  🎉 Thanks for subscribing! Check your email for exclusive offers.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                    isLoading 
                      ? 'bg-primary-light cursor-not-allowed' 
                      : 'bg-primary hover:bg-primary-dark text-white'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm`}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </form>
            )}
          </div>

          {/* Benefits Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-light p-3 rounded-lg">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-primary">
                    <path d="M12.834 20.167H9.167c-3.457 0-5.186 0-6.26-1.074s-1.074-2.802-1.074-6.26V11c0-3.457 0-5.185 1.074-6.26 1.074-1.073 2.803-1.073 6.26-1.073h3.667c3.456 0 5.185 0 6.259 1.074s1.074 2.802 1.074 6.26v1.833c0 3.457 0 5.185-1.074 6.259-.599.599-1.401.864-2.593.981M6.417 3.667V2.292m9.167 1.375V2.292m4.125 5.958H9.854m-8.02 0h3.552" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Weekly deals</h3>
                  <p className="text-gray-600 mt-1">
                    Fresh discounts on your favorite groceries every week.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-light p-3 rounded-lg">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-primary">
                    <path d="M12.834 3.208v6.875-5.958a1.375 1.375 0 1 1 2.75 0v5.958-3.208a1.375 1.375 0 1 1 2.75 0v7.791a5.5 5.5 0 0 1-5.5 5.5H11.8a5.5 5.5 0 0 1-3.76-1.486l-4.546-4.261a1.594 1.594 0 1 1 2.218-2.291l1.623 1.623V5.958a1.375 1.375 0 1 1 2.75 0v4.125-6.875a1.375 1.375 0 1 1 2.75 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">No spam</h3>
                  <p className="text-gray-600 mt-1">
                    Only quality content about groceries and special offers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;