import debounce from 'lodash/debounce';
import React from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { useAppDispatch } from '../../app/hooks';
import { SearchFeature } from '../../app/types';
import { searchForAddress } from '../../services/search';
import { error } from '../routes/routesSlice';

function SearchSelect({
  handleChange,
  selected,
}: {
  handleChange: (value: SingleValue<SearchFeature>) => void;
  selected: SearchFeature | null | undefined;
}) {
  const dispatch = useAppDispatch();

  const getResultsCallback = (
    text: string,
    callback: (options: SearchFeature[]) => void,
  ) => {
    searchForAddress(text)
      .then((res) => callback(res.features))
      .catch(
        (e) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          dispatch(error({ type: 'other', message: 'Search failed...' })),
        // eslint-disable-next-line function-paren-newline
      );
  };

  const getResults = debounce(getResultsCallback, 300);

  return (
    <AsyncSelect
      placeholder="Search..."
      value={selected}
      onChange={handleChange}
      loadOptions={getResults}
      getOptionLabel={(option: SearchFeature) => option.properties.label}
      getOptionValue={(option: SearchFeature) => option.properties.label}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
    />
  );
}

export default SearchSelect;
