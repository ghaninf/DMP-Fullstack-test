import { useContext, useEffect, useState } from "react"
import { UserContext } from "../layouts";
import { BackButton, Card } from "../components";

import '../assets/jobdetail.css';
import { JobService } from "../services";

export default function JobDetail() {
  const [state, setState] = useState({})
  const { pageURL } = useContext(UserContext);

  useEffect(() => {
    JobService.getDetail(pageURL[2])
      .then(res => {
        setState(res);
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [])

  const openNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleHTML = (data, id) => {
    if (data) {
      const linkContainer = document.getElementById(id)
      linkContainer.innerHTML = data;
    }
  }

  return(
    <main className="">
      <BackButton />
      <div className="relative w-full pt-5 pb-3 px-3 box-border">
        <article className="relative">
          <section className="relative">
            <h4 className="text-stone-500">{state?.type} / {state?.location}</h4>
            <h1 title={state?.title} className='text-2xl font-bold text-black'>{state?.title}</h1>
          </section>
          <div className="relative w-full flex flex-row flex-nowrap gap-x-6 box-border">
            <section className="relative w-full max-w-[70%]">
              {handleHTML(state?.description, 'description-item')}
              <div id="description-item" />
            </section>
            <section className="relative w-full max-w-[calc(30%-1.5rem)] flex flex-col gap-y-2">
              <Card customClass={'w-full border-xl'} >
                <div className="w-full p-1 flex flex-col">
                  <h4>{state?.company}</h4>
                  <img onClick={() => openNewTab(state?.company_url)} src={state?.company_logo} alt="company-logo" className="w-full" />
                  <span onClick={() => openNewTab(state?.company_url)} className="cursor-pointer" >{state?.company_url}</span>
                </div>
              </Card>
              <Card customClass={'w-full border-xl'} >
                <div className="w-full p-1 flex flex-col">
                  <h4>How to apply</h4>
                  {handleHTML(state?.how_to_apply, 'apply-link')}
                  <div id="apply-link" />
                </div>
              </Card>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}