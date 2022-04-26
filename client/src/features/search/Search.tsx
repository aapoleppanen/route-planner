import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { useAppDispatch } from '../../app/hooks';
import { SearchFeature } from '../../app/types';
import { InputCoordinates } from '../../graphql/graphql';
import { searchForAddress } from '../../services/search';
import { setFromCoords, setFromName } from '../map/mapSlice';

function Search() {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<SearchFeature | null>();

  const getResultsCallback = (
    text: string,
    callback: (options: SearchFeature[]) => void,
  ) => {
    searchForAddress(text)
      .then((res) => callback(res.features))
      .catch((e) => alert(e));
  };

  const getResults = debounce(getResultsCallback, 300);

  const handleChange = (value: SingleValue<SearchFeature>) => {
    setSelected(value);
    const coords: InputCoordinates = {
      lat: value?.geometry.coordinates[1] as number,
      lon: value?.geometry.coordinates[0] as number,
    };
    dispatch(setFromCoords(coords));
    dispatch(setFromName(value!.properties.name));
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
