import { useNavigate } from 'react-router-dom'
import Button from './button';

import ArrowBack from '../../assets/icon-arrow-left-pagination.svg';

export default function BackButton() {
  const navigate = useNavigate();
  
  return(
    <div className="flex flex-row flex-nowrap gap-x-4 text-zinc-500">
      <Button
        icon={ArrowBack}
        text={'Back'}
        typeColor={'tertiary'}
        onClick={() => navigate(-1)}
      />
    </div>
  )
}