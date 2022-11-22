import SearchBar from 'material-ui-search-bar';
import React from 'react'

const searchBar = props => {
    const { searched, requestSearch, cancelSearch } = props;

    return (
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
    )
}

export default searchBar;
