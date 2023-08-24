import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import userRequest from "../../utils/userRequest";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51NdqznSGqo6y3mFMXCN7I8QJoIVcjTi2xDZAvBRFVr36SGRLWPxQjUYuU54e5wzVWcWZtQc1aAHbzdKgJYaofweK00YYXpRmVh");

const Pay = ()=>{
    const [clientSecret, setClientSecret] = useState("");
    const { id } = useParams();
    useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await userRequest.post(
              `users/preposal-payment/${id}`
            );
            setClientSecret(res.data.clientSecret);

          } catch (err) {
            console.log(err);
          }
        };
        makeRequest();
      }, []);

      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

    return(
        <div className="App">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm Secret={clientSecret} propId={id}/>
          </Elements>
        )}
      </div>
    )
}

export default Pay