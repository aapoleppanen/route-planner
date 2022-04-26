import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { useAppDispatch } from '../../app/hooks';
import { SearchFeature } from '../../app/types';
import { InputCoordinates } from '../../graphql/graphql';
import { searchForAddress } from '../../services/search';
import { validateCoords } from '../../services/utils';
import { setFromCoords, setFromName } from '../map/mapSlice';
import { error } from '../routes/routesSlice';

function Search() {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<SearchFeature | null>();

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

  const handleChange = (value: SingleValue<SearchFeature>) => {
    try {
      setSelected(value);
      const coords: InputCoordinates = {
        lat: value?.geometry.coordinates[1] as number,
        lon: value?.geometry.coordinates[0] as number,
      };
      if (!validateCoords(coords)) {
        throw new Error();
      }
      dispatch(setFromCoords(coords));
      dispatch(setFromName(value!.properties.name));
    } catch (e) {
      dispatch(error({ type: 'other', message: 'Invalid Coordinates' }));
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default Search;
