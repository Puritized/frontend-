import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";

function VerifyPayment() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) return;

      try {
        const { data } = await API.get(`/payments/verify/${reference}`);
        if (data.status === true) {
          toast.success("Payment verified successfully!");
        } else {
          toast.error("Payment verification failed!");
        }
      } catch (err) {
        toast.error("Error verifying payment!");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <div className="verify-container">
      <h2>Verifying your payment...</h2>
    </div>
  );
}

export default VerifyPayment;