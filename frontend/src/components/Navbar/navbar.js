export default function Navbar(props) {

  const pages = {
    jobs: true,
    job: true
  }

  if (pages[props.page[1]]) {
    return(
      <div className="relative">
        <div className="px-2 py-3 bg-sky-600">
          <h1 className="text-xl font-bold text-white">GitHub <span className="font-thin">Jobs</span></h1>
        </div>
      </div>
    )
  }
  
  return

}