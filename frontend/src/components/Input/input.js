import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import IconShow from '../../assets/icon-show-password.svg';
import IconHide from '../../assets/icon-hide-password.svg';

Input.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default function Input(props) {

  const [togglePassword, setTogglePassword] = useState(false);

  return(
    <div htmlFor={props.name} className='relative w-full flex flex-col gap-1'>
      <label htmlFor={props.name} className='text-zinc-600 font-medium'>{props?.title}</label>
      <input
        type={props.type === 'password' ? togglePassword ? 'password' : 'text' : props.type}
        id={props.name}
        name={props.name}
        title={props.title}
        placeholder={props.placeholder}
        value={props.value}
        required={props?.required || false}
        onChange={props.onChange}
        className={`w-full ${props.icon ? 'pl-10 pr-3' : 'px-3' } py-2 rounded box-border border border-zinc-300 outline-3 outline-zinc-400 ${props?.additionalCSS || ''}`}
      />
      {
        props.type === 'password'
        ? <img src={ togglePassword ? IconShow : IconHide } onClick={ () => setTogglePassword(prev => !prev) } alt='show-password' className='absolute right-3 bottom-3 w-6 h-6 cursor-pointer' />
        : ''
      }
      {
        props?.icon
        ? <img src={ props?.icon } alt={'icon-input'} className='absolute left-2 bottom-3 w-6 h-6' />
        : ''
      }
      <span className='text-red-500'>{props?.error}</span>
    </div>
  )
}