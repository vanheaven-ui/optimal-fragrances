// src/app/contact/page.tsx
"use client";

import { useState, useEffect } from "react";
import FragranceLoader from "../../components/FragranceLoader"; // Adjust path as needed

// Inline SVG for icons (existing and new social icons)
const IconPhone = () => (
  <svg
    className="w-7 h-7 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    ></path>
  </svg>
);

const IconMail = () => (
  <svg
    className="w-7 h-7 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);

const IconDelivery = () => (
  <svg
    className="w-7 h-7 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 17v-2m3 2v-2m3 2v-2M9 21h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2zm2-11H9l3-3m0 0l3 3m-3-3v8"
    ></path>
  </svg>
);

// New: Instagram Icon SVG
const IconInstagram = () => (
  <svg
    className="w-7 h-7 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M12 0C8.74 0 8.333.01 7.043.07a6.002 6.002 0 00-4.047 1.407A6.002 6.002 0 001.407 7.043c-.06.71-.07 1.117-.07 4.957s.01 4.247.07 4.957a6.002 6.002 0 001.407 4.047 6.002 6.002 0 004.047 1.407c.71.06 1.117.07 4.957.07s4.247-.01 4.957-.07a6.002 6.002 0 004.047-1.407 6.002 6.002 0 001.407-4.047c.06-.71.07-1.117.07-4.957s-.01-4.247-.07-4.957a6.002 6.002 0 00-1.407-4.047A6.002 6.002 0 0016.957.07c-.71-.06-1.117-.07-4.957-.07zm0 2.163c4.103 0 4.587.015 5.206.046a3.832 3.832 0 012.57 1.002 3.832 3.832 0 011.002 2.57c.031.619.046 1.103.046 5.206s-.015 4.587-.046 5.206a3.832 3.832 0 01-1.002 2.57 3.832 3.832 0 01-2.57 1.002c-.619.031-1.103.046-5.206.046s-4.587-.015-5.206-.046a3.832 3.832 0 01-2.57-1.002 3.832 3.832 0 01-1.002-2.57c-.031-.619-.046-1.103-.046-5.206s.015-4.587.046-5.206a3.832 3.832 0 011.002-2.57 3.832 3.832 0 012.57-1.002c.619-.031 1.103-.046 5.206-.046zm0 3.627a6.21 6.21 0 100 12.42 6.21 6.21 0 000-12.42zm0 2.163a4.047 4.047 0 110 8.094 4.047 4.047 0 010-8.094zm6.065-4.597a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"
      clipRule="evenodd"
    />
  </svg>
);

// New: Facebook Icon SVG
const IconFacebook = () => (
  <svg
    className="w-7 h-7 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.776-3.89 1.094 0 2.24.195 2.24.195v2.46h-1.262c-1.225 0-1.628.75-1.628 1.549V12h2.775l-.444 2.891h-2.331v6.987C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ContactPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage("");
    setMessageType("");

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage("Please fill in all required fields.");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setSubmitMessage("Please enter a valid email address.");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      setSubmitMessage(
        "Your message has been sent successfully! We will get back to you shortly."
      );
      setMessageType("success");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      setSubmitMessage(
        "There was an error sending your message. Please try again later."
      );
      setMessageType("error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pageLoading) {
    return (
      <FragranceLoader message="Brewing the perfect contact experience..." />
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)] flex flex-col items-center font-sans">
      {/* Page Title Section */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-ug-text-heading text-center mb-6 leading-tight bg-gradient-to-r from-ug-purple-primary via-ug-text-dark to-ug-text-heading text-transparent bg-clip-text drop-shadow-md">
        Connect With Optimal Fragrance
      </h1>
      <p className="text-xl text-ug-text-dark text-center max-w-3xl mx-auto mb-12 md:mb-16">
        We are here to help! Reach out for inquiries about our unique scents,
        your orders, or anything else.
      </p>

      {/* Main Content Grid (Contact Info + Form) */}
      <div className="w-full max-w-6xl bg-ug-neutral-bg rounded-2xl shadow-2xl p-6 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 border border-ug-neutral-light">
        {/* Left Side: Contact Info & Social Media */}
        <div className="flex flex-col justify-between p-6 md:p-8 bg-gradient-to-br from-ug-purple-primary to-ug-purple-accent rounded-xl text-white shadow-lg relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
            Reach Out Directly
          </h2>
          <div className="w-20 h-1 bg-white opacity-50 mb-8 rounded-full"></div>{" "}
          {/* Decorative line */}
          <div className="space-y-8 flex-grow flex flex-col justify-center">
            {/* Phone */}
            <div className="flex items-center gap-4 animate-fade-in-left">
              <div className="p-3 bg-white/20 rounded-full">
                <IconPhone />
              </div>
              <div>
                <p className="font-semibold text-xl md:text-2xl">Phone</p>
                <a
                  href="tel:+256758071512"
                  className="text-white text-lg md:text-xl hover:underline opacity-90"
                >
                  +256 758 071 512
                </a>
              </div>
            </div>
            {/* Email */}
            <div className="flex items-center gap-4 animate-fade-in-left delay-100">
              <div className="p-3 bg-white/20 rounded-full">
                <IconMail />
              </div>
              <div>
                <p className="font-semibold text-xl md:text-2xl">Email</p>
                <a
                  href="mailto:info@optimalfragrances.ug"
                  className="text-white text-lg md:text-xl hover:underline opacity-90"
                >
                  info@optimalfragrances.ug
                </a>
              </div>
            </div>
            {/* Delivery Info */}
            <div className="flex items-start gap-4 animate-fade-in-left delay-200">
              <div className="p-3 bg-white/20 rounded-full">
                <IconDelivery />
              </div>
              <div>
                <p className="font-semibold text-xl md:text-2xl">
                  Effortless Delivery
                </p>
                <p className="text-white text-lg opacity-90">
                  We are an online-only store, bringing your desired fragrances
                  directly to your doorstep across Kampala, Uganda.
                  <br />
                  No physical storefront for pickups – just convenient delivery.
                </p>
              </div>
            </div>

            {/* New: Social Media Section */}
            <div className="mt-8 pt-6 border-t border-white/30 animate-fade-in-left delay-300">
              <p className="font-semibold text-xl md:text-2xl mb-4">
                Follow Us
              </p>
              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/optimalfragrances"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200 transform hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <IconInstagram />
                </a>
                <a
                  href="https://www.facebook.com/optimalfragrances"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200 transform hover:scale-110"
                  aria-label="Follow us on Facebook"
                >
                  <IconFacebook />
                </a>
                {/* Add more social media links as needed */}
              </div>
            </div>
          </div>
          {/* Decorative background elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl animate-blob-one"></div>
          <div className="absolute -top-5 -left-5 w-24 h-24 bg-white opacity-5 rounded-full blur-xl animate-blob-two"></div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="p-6 md:p-8 bg-white rounded-xl shadow-inner border border-ug-neutral-light">
          <h2 className="text-3xl md:text-4xl font-bold text-ug-text-heading mb-6 leading-tight">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-ug-text-dark text-lg font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border-2 border-ug-neutral-light rounded-xl shadow-sm
                           focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                           bg-ug-neutral-bg text-ug-text-dark placeholder-ug-text-dark/70 transition-all duration-200"
                required
                disabled={isSubmitting}
                aria-label="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-ug-text-dark text-lg font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border-2 border-ug-neutral-light rounded-xl shadow-sm
                           focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                           bg-ug-neutral-bg text-ug-text-dark placeholder-ug-text-dark/70 transition-all duration-200"
                required
                disabled={isSubmitting}
                aria-label="Your Email Address"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-ug-text-dark text-lg font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6} // Increased rows for more space
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 border-2 border-ug-neutral-light rounded-xl shadow-sm
                           focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                           bg-ug-neutral-bg text-ug-text-dark placeholder-ug-text-dark/70 resize-y transition-all duration-200"
                required
                disabled={isSubmitting}
                aria-label="Your Message"
              ></textarea>
            </div>
            {submitMessage && (
              <div
                className={`p-4 rounded-xl ${
                  // Larger padding and rounded-xl
                  messageType === "success"
                    ? "bg-ug-success text-white"
                    : "bg-ug-error text-white"
                } text-center font-medium shadow-md animate-fade-in`}
                role={messageType === "error" ? "alert" : "status"} // ARIA role for messages
              >
                {submitMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-ug-purple-primary text-white hover:bg-ug-purple-accent
                         px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105
                         disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-ug-purple-light focus:ring-offset-2 focus:ring-offset-ug-neutral-bg"
              disabled={isSubmitting}
              aria-label={isSubmitting ? "Sending Message..." : "Send Message"}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
