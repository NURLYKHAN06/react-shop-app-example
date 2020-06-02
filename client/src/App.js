import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout-page/checkout.component";

import {
  selectSnackbar,
  SnackbarActionTypes,
} from "./redux/snackbar/snackbar.reducer";

import { GlobalStyle } from "./global.styles";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";

const App = ({
  checkUserSession,
  currentUser,
  snackbar,
  clearSnackbar,
  ...props
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (snackbar.type) {
      setTimeout(() => {
        clearSnackbar();
      }, 1500);
    }
  }, [snackbar, clearSnackbar]);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      {snackbar.type && <h1>{snackbar.message}</h1>}
      <button
        onClick={() => {
          dispatch({
            type: SnackbarActionTypes.SNACKBAR_ON,
            payload: {
              type: "SUCCESS",
              message: "AAA",
            },
          });
        }}
      >
        test
      </button>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />

        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapState = createStructuredSelector({
  snackbar: selectSnackbar,
  currentUser: selectCurrentUser,
});

const actions = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapState, actions)(App);
