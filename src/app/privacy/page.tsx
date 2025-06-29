// src/app/privacy-policy/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { marked } from "marked"; // Import the marked library for Markdown parsing

export default function PrivacyPolicyPage() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you might fetch this content from a CMS or a static file.
    // For this example, we'll hardcode the markdown string.
    // NOTE: This should ideally be loaded from a separate .md file or an API endpoint.
    const policyMarkdown = `
# Privacy Policy for Optimal Fragrance
___
**Last Updated: June 27, 2025**

Optimal Fragrance ("we," "our," or "us") is committed to protecting the privacy of our website visitors and customers. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to safeguard your personal data in compliance with relevant data protection laws, including the General Data Protection Regulation (GDPR) and other applicable regional regulations.

## 1. Information We Collect

We may collect and process the following types of personal data:

### 1.1. Information You Provide Directly
* **Contact Information:** Name, email address, phone number, shipping address, billing address when you make a purchase, create an account, or contact us.
* **Account Information:** Username, password, and other registration details.
* **Transaction Data:** Details about products you have purchased, payment methods (though we do not store full credit card details, which are processed securely by third-party payment gateways).
* **Communications:** Records of your interactions with us, including customer service inquiries, feedback, and survey responses.

### 1.2. Information Collected Automatically
When you visit our website, we may automatically collect certain information about your device and browsing activity:
* **Device Information:** IP address, browser type, operating system, unique device identifiers.
* **Usage Data:** Pages viewed, links clicked, time spent on pages, referral source, and navigation paths.
* **Cookies and Tracking Technologies:** We use cookies and similar technologies (e.g., pixels, web beacons) to enhance your browsing experience, analyze site traffic, and personalize content.

## 2. How We Use Your Information

We use the collected information for various purposes, including:

* **To Provide Products and Services:** Process orders, manage your account, deliver products, and provide customer support.
* **To Improve Our Website and Offerings:** Analyze website usage, personalize your experience, and develop new products and features.
* **For Marketing and Communication:** Send promotional offers, newsletters, and updates (where you have consented or where permitted by law). You can opt-out at any time.
* **For Security and Fraud Prevention:** Protect against unauthorized access, maintain the security of our systems, and prevent fraudulent transactions.
* **To Comply with Legal Obligations:** Meet legal, regulatory, and compliance requirements.

## 3. Data Sharing and Disclosure

We do not sell your personal data. We may share your information with third parties only in the following circumstances:

* **Service Providers:** With trusted third-party vendors who perform services on our behalf, such as payment processing, shipping, website hosting, marketing, and analytics. These providers are obligated to protect your information and use it only for the purposes for which it was provided.
* **Legal Compliance:** When required by law, court order, or governmental request.
* **Business Transfers:** In connection with a merger, acquisition, or sale of all or a portion of our assets, subject to appropriate confidentiality agreements.
* **With Your Consent:** For any other purpose with your explicit consent.

## 4. Your Data Protection Rights

Depending on your location and applicable laws (e.g., GDPR), you may have the following rights regarding your personal data:

* **Right to Access:** Request a copy of the personal data we hold about you.
* **Right to Rectification:** Request correction of inaccurate or incomplete data.
* **Right to Erasure ("Right to be Forgotten"):** Request deletion of your personal data under certain conditions.
* **Right to Restriction of Processing:** Request that we limit the processing of your data under certain conditions.
* **Right to Data Portability:** Request your data in a structured, commonly used, and machine-readable format.
* **Right to Object:** Object to the processing of your data for direct marketing or certain other purposes.
* **Right to Withdraw Consent:** Withdraw your consent at any time where processing is based on consent.

To exercise any of these rights, please contact us using the details provided below.

## 5. Data Security

We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, firewalls, and secure socket layer (SSL) technology for data transmission. However, no method of transmission over the Internet or electronic storage is 100% secure.

## 6. Data Retention

We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for satisfying any legal, accounting, or reporting requirements.

## 7. Children's Privacy

Our website is not intended for children under the age of 16, and we do not knowingly collect personal data from children under 16. If we become aware that we have inadvertently collected personal data from a child under 16, we will take steps to delete such information as soon as possible.

## 8. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on our website and updating the "Last Updated" date.

## 9. Contact Us

If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:

**Optimal Fragrance Customer Service**
Email: privacy@optimalfragrance.com
Phone: +256 702 889 253
`;
    setMarkdownContent(policyMarkdown);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-ug-neutral-bg">
        <p className="text-ug-text-dark text-lg">Loading Privacy Policy...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ug-neutral-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <div
          className="prose prose-lg max-w-none" // Tailwind Typography classes
          dangerouslySetInnerHTML={{
            __html: marked.parse(markdownContent) as string,
          }}
        />
      </div>
    </div>
  );
}
