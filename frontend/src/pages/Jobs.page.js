import { useEffect, useState } from 'react';
import { Button, Searchbar } from '../components';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { JobService } from '../services';


export default function Jobs(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    data: []
  })
  const [page, setPage] = useState({
    page: 1,
    total: 100,
    limit: 10
  })

  // const getData = async () => {
  //   try {
  //     const response = await fetch(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json`);
  //     const data = await response.json();
  //     console.log(data)
  //     setState({ data: data });
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   }
  // }

  useEffect(() => {
    // getData()
    JobService.getList({ page: page.page, limit: 10 })
      .then((res) => {
        let data = state.data
        data = [...data, ...res.data]
        setState({ data: data })
        setPage((prev) => ({
          ...prev,
          total: res.page.total
        }))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [page.page])

  const loadmore = () => {
    setPage((prev) => ({
      ...prev,
      page: prev.page + 1
    }))
  }

  return(
    <div>
      <Searchbar />
      <div className="relative w-full pt-5 pb-3 px-3">
        <h1 className='text-2xl font-bold text-black'>Job List</h1>
        <div className='relative mt-4'>
          {
            state.data.map((el, key) => (
              <div key={key} onClick={() => navigate(`/job/${el.id}`)} className="relative py-2 flex flex-col gap-y-1 border-slate-300 border-b first:border-t cursor-pointer hover:bg-stone-100 ">
                <div className="relative flex flex-row justify-between">
                  <h4 className="text-sky-500">{el?.title}</h4>
                  <h5 className="text-stone-500">{el?.location}</h5>
                </div>
                <div className="relative flex flex-row justify-between">
                  <h4 className="text-stone-500">{el?.company} - <span className="text-green-500">{el?.type}</span></h4>
                  <h5>{moment(el?.created_at).fromNow()}</h5>
                </div>
              </div>
            ))
          }
          <Button
            text={'Load More'}
            typeColor={'primary'}
            onClick={loadmore}
          />
        </div>
      </div>
    </div>
  )
}