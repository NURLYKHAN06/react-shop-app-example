import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout-page/checkout.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import {
  selectSnackbar,
  SnackbarActionTypes,
} from "./redux/snackbar/snackbar.reducer";

import { GlobalStyle } from "./global.styles";

const App = ({ setCurrentUser, snackbar, clearSnackbar, ...props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser]);

  useEffect(() => {
    if (snackbar.type) {
      setTimeout(() => {
        clearSnackbar();
      }, 1500);
    }
  }, [snackbar, clearSnackbar]);

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
            props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapState = createStructuredSelector({
  currentUser: selectCurrentUser,
  snackbar: selectSnackbar,
});

const actions = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  clearSnackbar: () => dispatch({ type: SnackbarActionTypes.CLEAR_SNACKBAR }),
});

export default connect(mapState, actions)(App);
