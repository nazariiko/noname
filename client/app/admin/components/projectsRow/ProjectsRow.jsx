import { useCallback , useState} from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/projects-row.module.scss'
import ProjectCard from '../projectCard/ProjectCard'
import AddBtn from '../../UI/AddBtn'
import Modal from '../../../assets/components/modal/Modal'
import useModal from '../../../hooks/useModal'
import deleteProject from '../../services/deleteProject'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import closeProject from '../../services/closeProject'
import Loader from '../../../assets/components/loader/Loader'

export default function ProjectsRow({removeLocal,changeLocal,type,projects,status,index}) {
  const [selectedProjectId,setSelectedProjectId] = useState('')
  const [loading,setLoading] = useState(false)
  const {modalHandler,state} = useModal()
  const router = useRouter()

  const editProject = useCallback((id) => {
    router.push(`create/${type}/${status}/${id}`)
  },[])

  const removeProject = useCallback(async (event,id = '') => {
      if(event.target.id === 'delete'){
        setLoading(true)
        const {success} = await deleteProject(selectedProjectId,type)
        if(success){
          modalHandler(null,true)
          removeLocal(selectedProjectId,index)
          setLoading(false)
        }
        return
      }
      modalHandler(event)
      setSelectedProjectId(id)
  },[state,selectedProjectId])

  const changeProjectStatus = useCallback(async (id) => {
      setLoading(true)
      const {success} = await closeProject(id,type)
      if(success){
        changeLocal(id,index,type)
        setLoading(false)
      }
  },[])

  if(loading){
    return (
      <Loader/>
    )
  }

  return (
    <div className={styles.projects}>
    <div className={styles.subTitle}>{status}</div>
    {
        <div className={styles.projectsRow}>
        <div className={styles.addBtn}>
          <AddBtn handler={() => router.push(`create/${type}/${status}`)}/>
        </div>
        {   
        projects?.length
        ?
            projects.map((project) => {
                return (
                  <ProjectCard 
                  edit={editProject} 
                  remove={removeProject} 
                  change={changeProjectStatus}
                  key={project._id} 
                  project={project}/>
                )
            })
        :
        <></>
        }
        </div>
        }
        <Modal handler={modalHandler} isVisible={state}>
          <div className={styles.confirmDelete}>
           Are you sure you want to delete this project?
          </div>
          <SquareBtn handler={removeProject} btnId='delete' text={'Confirm'} width={'330'}/>
        </Modal>
    </div>
  )
}
