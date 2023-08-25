import { useState } from "react";
import Input from "../Input/input";

import IconCompany from '../../assets/icon-company.svg';
import IconLocation from '../../assets/icon-globe.svg';
import Button from "../Button/button";

export default function Searchbar() {
  const [state, setState] = useState({
    input: {
      job: '',
      location: '',
      fulltime: false
    }
  })

  const handleChange = (e) => {
    setState(prev => ({
      ...prev,
      input: {
        ...prev.input,
        [e.target.name]: e.target.value
      }
    }))
  }

  const handleSearch = () => {
    
  }

  return(
    <div className="relative w-full pt-5 pb-3 px-3 flex flex-row flex-nowrap gap-x-4">
      <Input
        name={'job'}
        type={'text'}
        title={'Job Description'}
        placeholder={'Filter by title, benefits, companies, expertise'}
        value={state.input.job}
        onChange={handleChange}
        icon={IconCompany}
      />
      <Input
        name={'location'}
        type={'text'}
        title={'Location'}
        placeholder={'Filter by city, state, zip code or country'}
        value={state.input.location}
        onChange={handleChange}
        icon={IconLocation}
      />
      <div className="relative mt-5 min-w-fit flex flex-row flex-nowrap gap-x-4 justify-center items-center">
        <input type="checkbox" value={state.input.fulltime} />
        <p>Full Time Only</p>
      </div>
      <div className="relative mt-5 min-w-fit flex flex-row flex-nowrap gap-x-4 justify-center items-center">
        <Button
          text={'Search'}
          typeColor={'secondary'}
          onClick={handleSearch}
        />
      </div>
    </div>
  )
}