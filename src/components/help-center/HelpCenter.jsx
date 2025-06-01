import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I contact customer support?',
    answer: 'You can use the contact form below or email us at support@mahavastu.com.'
  },
  {
    question: 'How can I list my property?',
    answer: 'Register for an account and use the "Add Property" feature from your dashboard.'
  },
  {
    question: 'What is Vastu consultation?',
    answer: 'Vastu consultation is a service to help you optimize your property according to traditional Indian architectural principles.'
  }
];

const HelpCenter = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Help Center</h2>
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">Frequently Asked Questions</h3>
        <ul className="space-y-4">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <details className="border rounded p-3">
                <summary className="font-medium cursor-pointer text-gray-800">{faq.question}</summary>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-blue-600">Contact Support</h3>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center">Thank you! Your message has been submitted.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border px-3 py-2 rounded"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border px-3 py-2 rounded"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="How can we help you?"
              className="w-full border px-3 py-2 rounded"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
