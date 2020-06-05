import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { createStructuredSelector } from "reselect";

import { useDispatch, connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { showSnackbar } from "../../redux/snackbar/snackbar.reducer";

const StripeCheckoutButton = ({ price, currentUser }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_l7ZySpZdmDiQySoeXMxL07dW00sC8fDVbK";
  const dispatch = useDispatch();

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(() => {
        dispatch(
          showSnackbar({
            type: "success",
            message: "Payment successful!",
          })
        );
      })
      .catch(() => {
        dispatch(
          showSnackbar({
            type: "error",
            message: "Please sure you use the provided credit cart.",
          })
        );
      });
  };

  return (
    <div className="wrapper">
      <StripeCheckout
        label="Pay Now"
        name="CRWN Clothing Ltd."
        billingAddress
        shippingAddress
        image="https:/svgshare.com/i/CUz.svg"
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        disabled={!currentUser}
        stripeKey={publishableKey}
      />
      {!currentUser && <span>SIGN IN TO PAY </span>}
    </div>
  );
};

const mapState = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapState)(StripeCheckoutButton);
