import PropTypes from 'prop-types';

Button.propTypes = {
  icon: PropTypes.string,
  positionIcon: PropTypes.oneOf(['left', 'right']),
  text: PropTypes.string.isRequired,
  typeColor: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  onClick: PropTypes.func,
}

export default function Button(props) {
  const typeColor = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
    secondary: 'text-white bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600',
    tertiary: 'text-blue-500 bg-white font-bold hover:text-blue-700 active:text-blue-800',
  }
  const positionIcon = {
    left: 'flex-row',
    right: 'flex-row-reverse'
  }
  return(
    <button
      onClick={props?.onClick || undefined}
      className={`relative w-fit min-w-[100px] h-fit px-4 py-1.5 flex flex-nowrap gap-x-1 justify-center items-center box-border rounded cursor-pointer border border-transparent
        ${positionIcon[props?.positionIcon] || ''} ${typeColor[props?.typeColor] || ''} ${props?.customClass || ''} ${props?.customClass ? props.customClass : ''}`}>
      { props?.icon ? <img src={props?.icon} alt='ico' className='w-[12px] h-[12px]' /> : '' }
      { props?.text || null }
    </button>
  )
}