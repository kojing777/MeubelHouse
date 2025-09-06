import React from "react";

const Testimonials = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Blogger",
      image: "https://i.pinimg.com/736x/f2/5a/a3/f25aa3f31451fd87fb336d79655c9132.jpg",
      comment: "The quality of their organic produce is outstanding! I've been ordering weekly for my family, and everything arrives fresh and perfectly packaged. Their customer service is exceptional too!",
      rating: 5,
      date: "2 weeks ago",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Customer",
      image: "https://i.pinimg.com/736x/e4/89/7c/e4897cba31a089629c3bdecee4c93def.jpg",
      comment: "As a busy professional, Groceezy has been a lifesaver. Their delivery is always on time, and the app makes reordering my regular items so easy. The prices are competitive too!",
      rating: 5,
      date: "1 month ago",
      verified: true
    },
    {
      id: 3,
      name: " Mia Khalifa",
      role: "Nutritionist",
      image: "https://i.pinimg.com/736x/0b/34/92/0b34926d2f02f26a0c0c2999854f42df.jpg",
      comment: "I recommend Groceezy to all my clients. Their selection of healthy options and detailed nutritional information makes it easy to maintain a balanced diet. The quality is consistently excellent!",
      rating: 5,
      date: "3 weeks ago",
      verified: true
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Chef",
      image: "https://i.pinimg.com/736x/8d/e2/8c/8de28ccf0f36db61a04a9d24720030e2.jpg",
      comment: "The ingredients I receive are restaurant-quality. I use them in my home cooking and they never disappoint. The meat and seafood selection is particularly impressive!",
      rating: 5,
      date: "2 months ago",
      verified: true
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-slide-down">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
            Don't just take our word for it - hear from our satisfied food lovers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-2 animate-card-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center relative mb-8">
                <div className="absolute -top-14 group">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="pt-20 text-center">
                  <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-center mb-6 italic flex-grow hover:scale-[1.03] transition-transform duration-200">
                "{testimonial.comment}"
              </p>
              
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="22"
                    height="22"
                    viewBox="0 0 22 20"
                    className={`transition-all duration-300 hover:scale-125 hover:rotate-12 ${i < testimonial.rating ? "text-orange-500" : "text-gray-300"}`}
                  >
                    <path 
                      d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" 
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes ping {
          0% { transform: scale(0.2); opacity: 0.8; }
          80% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;