import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      rating: "★★★★★",
      quote:
        "Found an excellent cardiologist through Clinichinder. The booking process was seamless!",
      name: "Sarah Johnson",
      location: "New York",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      rating: "★★★★★",
      quote:
        "Quick platform! Helped me find a specialist quickly when I needed urgent care.",
      name: "Michael Chen",
      location: "California",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
    {
      rating: "★★★★★",
      quote: "User-friendly interface and reliable doctors. Highly recommend",
      name: "Emily Davis",
      location: "Texas",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          What Our Patients Say
        </h1>
        <p className="text-lg text-gray-600">
          Real experiences from real patients
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`${testimonial.bgColor} p-6 rounded-lg shadow-md border ${testimonial.borderColor} hover:shadow-lg transition-shadow`}
          >
            <div className="text-yellow-400 text-2xl mb-4">
              {testimonial.rating}
            </div>
            <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
            <div className="border-t border-gray-200 pt-4">
              <p className="font-medium text-gray-800">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
