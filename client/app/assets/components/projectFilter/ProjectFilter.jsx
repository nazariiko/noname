import { useMemo , useState , useCallback,useEffect} from 'react'
import styles from './project-filter.module.scss'
import Image from 'next/image'
import loader from '../../../utils/loader'

export default function ProjectFilter({filtersInitialState,project}) {
    const [filters,setFilters] = useState(filtersInitialState)
    const [filter,setFilter] = useState(filtersInitialState[0].title)

    const filtersHandler = useCallback((event) => {
        if(event.target.id === 'block') return 
    
        const target = event.target.textContent
        setFilters(filters.map((filter) => {
            if(filter.title === target){
                return {...filter,isSelect:true}
            }
            return {...filter,isSelect:false}
        }))
        setFilter(target)
      },[])

    const data = useMemo(() => {
        return project[filter.toLowerCase()]
    },[filter]) 

    useEffect(() => {
        const actualFilter = filters
        .find((filter) => {
            return (
                project[filter.title.toLowerCase()].length
            )
        }).title
        setFilter(actualFilter)
        setFilters(filters.map((filter) => {
            if(filter.title === actualFilter){
                return {...filter,isSelect:true}
            }
            return {...filter,isSelect:false}
        }))
    },[])

  return (
    <>
    <div id='block' onClick={filtersHandler} className={styles.filters}>
    {filters.filter((filter) => project[filter.title.toLowerCase()].length)
    .map((filter,index) => {
            return (
            <button 
            className={filter.isSelect ? styles.filterBtnSelected : styles.filterBtn} 
            key={filter.title}>
                {filter.title}
            </button>
        )
    })}
    </div>
    <div className={styles.infoBlock}>
        {data?.length 
        ? 
        data.map((item,index) => {
            return (
                <a href={item.link} target={'_blank'} key={index} className={styles.item}>
                    <div className={styles.img}>
                        {
                            item.img
                            ?
                            <Image loader={() => loader(item.img)} width={'64'} height={'64'} src={item.img} alt={item.name}/>                        
                            :
                            <></>
                        }
                    </div>
                    <div className={styles.name}>
                        {item.name}
                    </div>
                    <div className={styles.text}>
                        {item.text}
                    </div>
                </a>
            )
        })
        :
        <></>
        }
    </div>
    </>
  )
}
