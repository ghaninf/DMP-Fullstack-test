import Input from "../Input/input";

import IconCompany from '../../assets/icon-company.svg';
import IconLocation from '../../assets/icon-globe.svg';
import Button from "../Button/button";

export default function Searchbar(props) {
  return(
    <div className="relative w-full pt-5 pb-3 px-3 flex flex-row flex-nowrap gap-x-4">
      <Input
        name={'description'}
        type={'text'}
        title={'Job Description'}
        placeholder={'Filter by title, benefits, companies, expertise'}
        value={props.input.description}
        onChange={props.onChange}
        icon={IconCompany}
      />
      <Input
        name={'location'}
        type={'text'}
        title={'Location'}
        placeholder={'Filter by city, state, zip code or country'}
        value={props.input.location}
        onChange={props.onChange}
        icon={IconLocation}
      />
      <div onClick={props.handleFulltime} className="relative mt-5 min-w-fit flex flex-row flex-nowrap gap-x-4 justify-center items-center cursor-pointer">
        <input type="checkbox" checked={props.input.fulltime} />
        <p>Full Time Only</p>
      </div>
      <div className="relative mt-5 min-w-fit flex flex-row flex-nowrap gap-x-4 justify-center items-center">
        <Button
          text={'Search'}
          typeColor={'secondary'}
          onClick={props.onSearch}
        />
      </div>
    </div>
  )
}