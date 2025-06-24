"use client";

import posthog from "posthog-js";
import { useState, useEffect } from "react";

export default function AnalyticsConsent() {
  const STORAGE_KEY = "analytics_consent";
  const [visible, setVisible] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (consent: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, consent ? "opt_in" : "opt_out");
    } catch (e) {
      console.error("Failed to save analytics consent", e);
    }
    setVisible(false);
    // Optionally initialize analytics here if consent === true
    if (!consent) {
      posthog.opt_out_capturing();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md text-center mx-4">
        <h2 className="text-xl font-semibold mb-4">Test Version dApp</h2>
        <p className="mb-3 text-gray-700">
          {`This is a testnet environment that doesn’t handle real money or real
          carbon credits. Please set your wallet to the Stellar Testnet before
          connecting.`}
        </p>
        <h2 className="text-xl font-semibold mb-4">Analytics Consent</h2>
        <p>
          {`We’d like to collect anonymous analytics data to help us improve the app. Your
          choice will be stored locally in your browser.`}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleChoice(false)}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            Opt out
          </button>
          <button
            onClick={() => handleChoice(true)}
            className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
          >
            Opt in
          </button>
        </div>
      </div>
    </div>
  );
}
