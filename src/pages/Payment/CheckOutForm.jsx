import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import userRequest from "../../utils/userRequest";

const CheckoutForm = ({ Secret, gigId }) => {
  // console.log("this is the gigs id ", gigId);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(Secret);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   // if (!clientSecret) {
  //   //   return;
  //   // }else{
  //   //   console.log(clientSecret,8798);
  //   // }

  // //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  // //     switch (paymentIntent.status) {
  // //       case "succeeded":
  // //         setMessage("Payment succeeded!");
  // //         break;
  // //       case "processing":
  // //         setMessage("Your payment is processing.");
  // //         break;
  // //       case "requires_payment_method":
  // //         setMessage("Your payment was not successful, please try again.");
  // //         break;
  // //       default:
  // //         setMessage("Something went wrong.");
  // //         break;
  // //     }
  // //   });
  // }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: "http://localhost:8800/api/users/sucess",
      },
      redirect: "if_required",
    });

    if (paymentIntent) {
      // backend calll

      console.log(paymentIntent,"payment of the interen");
      userRequest.post("users/paymentsuccess",{gigId});
      navigate(`/success`);
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <div class="bg-white min-h-screen flex flex-col justify-between">
        <header class="py-4 bg-transparent text-gray-800 text-center">
          <h1 class="text-4xl font-extrabold">Secure Payment</h1>
          <p class="mt-2">Fast, Easy, and Secure</p>
        </header>

        <main class="flex-grow flex items-center justify-center px-4">
          <form
            id="payment-form"
            onSubmit={handleSubmit}
            class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
          >
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => setEmail(e.target.value)}
              class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
              class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              class="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-md shadow-md hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring focus:ring-teal-300"
            >
              <span id="button-text">
                {isLoading ? (
                  <div class="spinner" id="spinner"></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {message && (
              <div id="payment-message" class="mt-4 text-red-500">
                {message}
              </div>
            )}
          </form>
        </main>

        <footer class="py-4 bg-transparent text-gray-800 text-center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default CheckoutForm;
