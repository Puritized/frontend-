import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/api";

function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!amount || !email) return toast.error("Please enter all details");

    try {
      const { data } = await API.post("/payments/initialize", { email, amount });

      if (data.status === true && data.data.authorization_url) {
        window.location.href = data.data.authorization_url; // Redirect to Paystack payment page
      } else {
        toast.error("Failed to initialize payment");
      }
    } catch (error) {
      toast.error("Payment error: " + error.message);
    }
  };

  return (
    <div className="payment-container">
      <h2>Pay School Fees</h2>
      <form onSubmit={handlePayment} className="payment-form">
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Amount (₦):</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit" className="pay-btn">
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;