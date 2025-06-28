// src/app/contact/page.tsx
"use client";

import { useState, useEffect } from "react"; // Import useEffect
import FragranceLoader from "../../components/FragranceLoader"; // Adjust path as needed

// Inline SVG for icons (no changes needed here)
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

export default function ContactPage() {
  // New state for initial page loading
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Use useEffect to simulate initial data fetching/page readiness
  useEffect(() => {
    // Simulate a network request or heavy component loading
    const timer = setTimeout(() => {
      setPageLoading(false); // Once "loading" is done, set pageLoading to false
    }, 1000); // Simulate 1 second of loading

    // Cleanup function: important to clear timeout if component unmounts early
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

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
    if (isSubmitting) return; // Prevent multiple submissions

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
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Conditional Rendering for Page Loading ---
  if (pageLoading) {
    return (
      <FragranceLoader message="Brewing the perfect contact experience..." />
    );
  }
  // --- End Conditional Rendering ---

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)] flex flex-col items-center font-sans">
      <h1 className="text-5xl md:text-6xl font-extrabold text-ug-text-heading text-center mb-6">
        Connect With Optimal Fragrance
      </h1>
      <p className="text-xl text-ug-text-dark text-center max-w-2xl mx-auto mb-12">
        We're here to help! Reach out for inquiries about our unique scents,
        your orders, or anything else.
      </p>

      <div className="w-full max-w-6xl bg-ug-neutral-bg rounded-xl shadow-2xl md:p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 border border-ug-neutral-light">
        {/* Left Side: Contact Info & Decorative elements */}
        <div className="flex flex-col justify-between p-6 bg-gradient-to-br from-ug-purple-primary to-ug-purple-accent rounded-lg text-white shadow-lg relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Reach Out Directly
          </h2>
          <hr />
          <div className="space-y-8 mt-auto flex-grow flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <IconPhone />
              <div>
                <p className="font-semibold text-xl">Phone</p>
                <p className="text-white text-lg">+256 758 071 512</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <IconMail />
              <div>
                <p className="font-semibold text-xl">Email</p>
                <p className="text-white text-lg">info@optimalfragrances.ug</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <IconDelivery />
              <div>
                <p className="font-semibold text-xl">Effortless Delivery</p>
                <p className="text-white text-lg">
                  We are an online-only store, bringing your desired fragrances
                  directly to your doorstep across Kampala, Uganda.
                  <br />
                  No physical storefront for pickups – just convenient delivery.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute -top-5 -left-5 w-24 h-24 bg-white opacity-5 rounded-full blur-xl"></div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-ug-text-heading mb-6">
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
                className="w-full p-3 border border-ug-neutral-light rounded-lg shadow-sm
                           focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                           bg-white text-ug-text-dark placeholder-ug-text-dark/70"
                required
                disabled={isSubmitting} // Still disable while submitting form
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
                className="w-full p-3 border border-ug-neutral-light rounded-lg shadow-sm
                           focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                           bg-white text-ug-text-dark placeholder-ug-text-dark/70"
                required
                disabled={isSubmitting} // Still disable while submitting form
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
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-ug-neutral-light rounded-lg shadow-sm
                           focus:ring-ug-purple-primary focus:border-ug-purple-primary text-lg
                           bg-white text-ug-text-dark placeholder-ug-text-dark/70 resize-y"
                required
                disabled={isSubmitting} // Still disable while submitting form
              ></textarea>
            </div>
            {submitMessage && (
              <div
                className={`p-3 rounded-lg ${
                  messageType === "success"
                    ? "bg-ug-success text-white"
                    : "bg-ug-error text-white"
                } text-center font-medium`}
              >
                {submitMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-4 rounded-lg text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
