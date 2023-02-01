import styles from './project-card.module.scss'
import Image from 'next/image'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import heartSvg from '../../icons/heart.svg'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import parseFunded from '../../../utils/parseFunded'
import favourites from '../../../services/favourites'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../../../store/slices/authSlice'
import { toggleModal } from '../../../store/slices/modalsSlice'
import loader from '../../../utils/loader'

export default function ProjectCard({modalHandler,project}) {
    const userData = useSelector((state) => state.auth.userData)
    const progress = useMemo(() => {
        return project?.funded && parseFunded(project.funded)
    },[project])
    const dispatch = useDispatch()
    
    const addProject = async () => {
        if(!userData.isAuth){
            dispatch(toggleModal('wallet'))
            return
        }

        if(userData?.favourites?.includes(project._id)) return

        const updatedUserData = {...userData,favourites:[...userData.favourites,project._id]}
        dispatch(setUserData(updatedUserData))
        
        const {success} = await favourites(project._id,userData.address)
        if(success){
            modalHandler(null,true)
        }
    }

    const router = useRouter()
    
  return (
    <div className={styles.container}>
    <div className={styles.body}>
        <div className={styles.row}>
            <div className={styles.img}>
                <Image loader={() => loader(project.img)} width={'84'} height={'84'} src={project.img} alt={project.title}/>
            </div>
            <div className={styles.info}>
                <div className={styles.infoRow}>
                    <div className={styles.status}>{project.status}</div>
                    <div className={styles.socialmedia}>
                        {
                        project.socialmedia?.length 
                        ?
                        project.socialmedia.map((item,index) => {
                            return (
                                <a key={index} href={item.link} target={'_blank'}>
                                    <Image width={'20'} height={'18'} src={item.icon} alt={item.alt}/>
                                </a>
                            )
                        })
                        :
                        <></>
                        }
                    </div>
                </div>
                <div className={styles.infoTitleBlock}>
                    <div className={styles.infoTitle}>{project.title}</div>
                </div>
                <div className={styles.infoDescription}>
                    {project.description}
                </div>
            </div>
        </div>
        <div className={styles.dates}>
            <div className={styles.startDate}>
                <span className={styles.key}>Start date: </span>
                <span className={styles.value}>{project.dateStart}</span>
            </div>
            <div className={styles.endDate}>
                <span className={styles.key}>End date: </span>
                <span className={styles.value}>{project.dateEnd}</span>
            </div>
        </div>
        <div className={styles.btns}>
            <SquareBtn handler={() => router.push(`/participate/${project.path}/${project._id}`)} text={'Participate'} width={'524'}/>
            <button onClick={addProject} type={'button'} className={styles.likeBtn}>
                <Image src={heartSvg} alt='btn'/>
            </button>                   
        </div>
    </div>

    <hr className={styles.line}/>

    <div className={styles.progress}>
      <div className={styles.progressRow}>
        <div className={styles.rowItem}>
            <span className={styles.key}>Field:</span>
            <span className={styles.value}>{project.field}</span>                    
        </div>
        <div className={styles.rowItem}>
            <span className={styles.key}>Funding goal:</span>
            <span className={styles.goalValue}>{project.goal}</span>                    
        </div>
      </div>
      <div className={styles.progressBar}>
        <div style={{width:`${progress ? progress : 0}%`}} className={styles.progressBarBody}>

        </div>
      </div>
    </div>    
    <div className={styles.funded}>
        <span className={styles.key}>Funded:</span>                    
        <span className={styles.textBlue}>{project.funded}</span>                    
    </div>

    <hr className={styles.line}/>

    </div>
  )
}
