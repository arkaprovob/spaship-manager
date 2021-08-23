import { SearchIcon } from "@patternfly/react-icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { components } from "react-select";
import AsyncSelect from 'react-select/async';
import useConfig from "../../hooks/useConfig";
import { get } from "../../utils/APIUtil";

export default (props) => {
  const { selected, setSelectedConfig, env, setWebsiteConfig } = useConfig();
  const [event, setEvent] = useState([]);
  const history = useHistory();
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);


  useEffect(() => {
  }, [selected]);

  const handleInputChange = value => {
    setValue(value);
  };

  const handleChange = value => {
    setSelectedValue(value);
    console.log(value);

    const websiteConfig = { name: value.propertyName };
    setWebsiteConfig(websiteConfig);
    history.push(`/dashboard/${value.propertyName}/spaName/${value.spaName}`);
  }


  const onLoadHandleChange = () => {
    history.push(`/dashboard/one.redhat.com/spaName/home`);
  }

  const loadOptions = async (inputValue) => {
    if (inputValue.length == 0) {
      this.inputValue = ""
    }
    const url = env.managerPath + `/event/get/search/spaName/${inputValue}`;
    const searchedResponse = await get(url);
    return searchedResponse;
  };
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', width: 350, }),
    option: (styles, { isFocused, isSelected }) => {
      const color = 'black';
      return {
        ...styles,
        backgroundColor: isFocused ? '#A9A9A9' : 'default',
        color: '#696969',
        width: 350
        // cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };


  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <SearchIcon />
      </components.DropdownIndicator>
    );
  };


  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        components={{ DropdownIndicator }}
        getOptionLabel={e => e.spaName + ' (' + e.propertyName + ') '}
        getOptionValue={e => e.spaName + ' (' + e.propertyName + ') '}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        onLoad={onLoadHandleChange}
        styles={colourStyles}
        placeholder="Search SPA"
        noOptionsMessage={({ selectedValue }) => !selectedValue ? 'No results found' : 'No results found'}
      />
    </div>
  );
}
