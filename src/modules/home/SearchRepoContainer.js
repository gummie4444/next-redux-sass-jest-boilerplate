import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';

import { getTopRepos } from './api/homeActions';
import SearchResults from './components/SearchResults';

class SearchRepoContainer extends Component {
  static async getInitialProps({ store, query }) {
    const lang = query.lang || 'javascript';
    await store.dispatch(getTopRepos({ lang }));
  }

  componentDidMount() {
    const { getTopReposFunc } = this.props;
    getTopReposFunc({ lang: 'ruby' });
    console.log('test');
  }

  render() {
    const { repos } = this.props;
    return <SearchResults repos={repos} />;
  }
}

function mapStateToProps(state) {
  return {
    repos: state.repos,
  };
}

SearchRepoContainer.propTypes = {
  repos: PropTypes.instanceOf(Map).isRequired,
  getTopReposFunc: PropTypes.func.isRequired,
};

export { SearchRepoContainer };
export default connect(mapStateToProps, {
  getTopRepos,
})(SearchRepoContainer);
