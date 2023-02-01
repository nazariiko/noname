import { useCallback, useState , useLayoutEffect} from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/projects.module.scss'
import Info from '../../assets/components/info/Info'
import Project from '../project/Project'


const filtersInitialState = [
    {
        title:'Active',
        isSelect:true,
    },
    {
        title:'Upcoming',
        isSelect:false,
    },
    {
        title:'Ended',
        isSelect:false,
    },
]

export default function Projects({type,title,text}) {
    const [filters,setFilters] = useState(filtersInitialState)
    const [filter,setFilter] = useState('Active')
    const [projects,setProjects] = useState([])
    const allProjects = useSelector((state) => {
        if(type === 'donates'){
            return state.allProjects.projects
        }
        return state.allProjects.projects
    })
    
    useLayoutEffect(() => {
 
        const findedProjects = allProjects.find((pr) => {
            return pr.name.toLowerCase() === filter.toLowerCase()
        })?.projects

        if(!findedProjects?.length){
            setProjects([])
            return
        }

        setProjects([...findedProjects].reverse())
    }, [allProjects,filter]);

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

  return (
    <div className={styles.projects}>
        <div>
            <Info title={title} 
            text={text}/>
        </div>
        <div id='block' onClick={filtersHandler} className={styles.filters}>
            {filters.map((filter) => {
                return (
                    <button 
                    className={filter.isSelect ? styles.filterBtnSelected : styles.filterBtn} 
                    key={filter.title}>
                        {filter.title}
                    </button>
                )
            })}
        </div>
       <div className={styles.projectsItems}>
        
       {
        projects?.length
        ?
       projects.map((pr,index) => {
            return <Project type={type} key={index} filter={filter} project={pr} index={index}/>
        })
        :
        <></>    
        } 
       </div>
    </div>
  )
}
