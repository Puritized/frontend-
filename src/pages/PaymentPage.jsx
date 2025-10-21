import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  // Load Paystack Inline Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();

    if (!email || !amount) {
      return toast.error("Please enter both email and amount");
    }

    const paystackPublicKey = "pk_test_xxxxxxxxxxxxxxxxxxxxxxx"; // 🔑 Replace with your Paystack public key
    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: email,
      amount: Number(amount) * 100, // Convert to kobo
      currency: "NGN",
      ref: "PHIA-" + Date.now(), // Unique reference
      metadata: {
        custom_fields: [
          {
            display_name: "Student Email",
            variable_name: "student_email",
            value: email,
          },
        ],
      },
      callback: function (response) {
        toast.success("Payment successful! Reference: " + response.reference);
        window.location.href = `/verify-payment?reference=${response.reference}`;
      },
      onClose: function () {
        toast.info("Transaction was cancelled.");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="payment-container">
      <h2>Pay School Fees</h2>
      <form onSubmit={handlePayment} className="payment-form">
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter student email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Amount (₦):</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit" className="pay-btn">
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
