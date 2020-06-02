import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPage from "../collection/collection.component";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { selectIsCollectionLoaded } from "../../redux/shop/shop.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, fetchCollectionsStart, isCollectionLoaded }) => {
  useEffect(() => {
    fetchCollectionsStart();
  });

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />

      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner
            isLoading={!isCollectionLoaded}
            {...props}
          />
        )}
      />
    </div>
  );
};

const mapState = createStructuredSelector({
  isCollectionLoaded: selectIsCollectionLoaded,
});

const actions = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapState, actions)(ShopPage);
