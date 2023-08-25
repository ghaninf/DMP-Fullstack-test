import { useNavigate } from "react-router-dom"
import { AuthService } from "../../services"
import Button from "../Button/button"

export default function Navbar(props) {
  const navigate = useNavigate();
  const pages = {
    jobs: true,
    job: true
  }

  const logout = () => {
    AuthService.logout();
    navigate('/login')
  }

  if (pages[props.page[1]]) {
    return(
      <div className="relative">
        <div className="relative px-2 py-3 flex flex-row justify-between bg-sky-600">
          <h1 className="text-xl font-bold text-white">GitHub <span className="font-thin">Jobs</span></h1>
          <Button
            text="Logout"
            typeColor={'secondary'}
            onClick={logout}
          />
        </div>
      </div>
    )
  }
  
  return

}