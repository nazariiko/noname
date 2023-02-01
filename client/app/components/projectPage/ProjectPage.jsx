import styles from '../styles/project-page.module.scss'
import ProjectCard from '../../assets/components/projectCard/ProjectCard'
import ProjectInfoBlock from '../../assets/components/projectInfoBlock/ProjectInfoBlock'
import ProjectFilter from '../../assets/components/projectFilter/ProjectFilter'
import ProjectLinks from '../../assets/components/projectLinks/ProjectLinks'
import Modal from '../../assets/components/modal/Modal'
import Success from '../../assets/components/success/Success'
import useModal from '../../hooks/useModal'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import { useRouter } from 'next/router'

const filtersInitialState = [
  {
      title:'Investors',
      isSelect:true,
  },
  {
      title:'Team',
      isSelect:false,
  },
  {
      title:'Partners',
      isSelect:false,
  },
]

export default function ProjectPage({project}) {
  const {state,modalHandler} = useModal()
  const router = useRouter()

  return (
    <>
    <div className={styles.container}>
    <div className={styles.body}>
        <ProjectCard modalHandler={modalHandler} project={project} />
        <ProjectInfoBlock img={project?.projectImg ? project?.projectImg : ''} 
        text={project?.descriptionFull ? project?.descriptionFull : ''}/>
    </div>
    <div className={styles.filtersInfo}>
      <ProjectFilter project={project} filtersInitialState={filtersInitialState}/>  
    </div>
    <div className={styles.links}>
      <ProjectLinks links={project.links}/>
    </div>
    </div>
    <Modal handler={modalHandler} isVisible={state} >
      <Success/>
      <div className={styles.successBtn}>
        <SquareBtn 
        handler={() => router.push('/waitinglist')} 
        width='330' 
        text={'Go to waiting list'}/>
      </div>
    </Modal>
    </>
  )
}
