

export default function Card({ children, hover, dropShadow, customClass }) {


  return(
    <div className={`relative w-fit h-auto flex flex-row flex-nowrap justify-center border rounded-lg box-border bg-white ${customClass ? customClass : ''} ${dropShadow ? 'drop-shadow' : ''} ${hover ? 'cursor-pointer hover:drop-shadow-lg hover:-mt-1 hover:-ml-1' : '' }`}>
      { children }
    </div>
  )
}