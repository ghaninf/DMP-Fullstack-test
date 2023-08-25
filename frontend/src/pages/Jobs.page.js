import { useEffect, useState } from 'react';
import { Button, Searchbar } from '../components';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { JobService } from '../services';


export default function Jobs(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    data: [],
    input: {
      description: '',
      location: '',
      fulltime: false
    },
    newSearch: 0
  })

  const [page, setPage] = useState({
    page: 1,
    total: 100,
    limit: 10,
    newSearch: 0
  })

  useEffect(() => {
    JobService.getList({ page: page.page, limit: 10, ...state.input })
      .then((res) => {
        let data = state.data
        if (page.page === 1) {
          data = res.data
        } else {
          data = [ ...data, ...res.data ]
        }
        setState(prev => ({
          ...prev,
          data: data,
        }))
        setPage((prev) => ({
          ...prev,
          total: res.page.total
        }))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [page.page, page.newSearch])

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name === 'fulltime') {
      value = !state.input.fulltime
    }

    setState(prev => ({
      ...prev,
      input: {
        ...prev.input,
        [name]: value
      }
    }))
  }

  const loadmore = () => {
    if ((page.page * page.limit) < page.total) {
      setPage((prev) => ({
        ...prev,
        page: prev.page + 1
      }))
    }
  }

  const handleSearch = () => {
    setPage((prev) => ({
      ...prev,
      page: 1,
      newSearch: prev.newSearch + 1
    }))
  }

  return(
    <div>
      <Searchbar
        input={state.input}
        onSearch={handleSearch}
        onChange={handleChange}
      />
      <div className="relative w-full pt-5 pb-3 px-3">
        <h1 className='text-2xl font-bold text-black'>Job List</h1>
        <div className='relative mt-4'>
          {
            state.data.map((el, key) => {
              if (!el) {
                return ''
              } else {
                return(
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
                )
              }
            })
          }
          <Button
            text={'Load More'}
            typeColor={'primary'}
            onClick={loadmore}
            customClass={'w-60 mx-auto mt-6'}
          />
        </div>
      </div>
    </div>
  )
}