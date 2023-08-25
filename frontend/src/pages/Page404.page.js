import { useNavigate } from "react-router-dom"
import { Button } from "../components";


export default function Page404(props) {
  const navigate = useNavigate();
  return(
    <div>
      Page 404
      <Button
        text={'Back to Login'}
        typeColor={'primary'}
        onClick={() => navigate('/login')}
      />
    </div>
  )
}