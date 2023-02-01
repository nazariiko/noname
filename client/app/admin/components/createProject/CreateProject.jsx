import { useState , useCallback, useEffect , useRef} from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/create.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Input from '../../UI/Input'
import Select from '../../UI/Select'
import FileInput from '../../UI/FileInput'
import RatingSelect from '../../UI/RatingSelect'
import CustomCalender from '../../../assets/components/calendar/Calendar'
import TextEditor from '../textEditor/TextEditor'
import SocialMedia from '../socialMedia/SocialMedia'
import DocumentationLinks from '../documentationLinks/DocumentationLinks'
import Participants from '../participants/Participants'
import createProject from '../../services/createProject'
import editProject from '../../services/editProject'
import fileFormParse from '../../../utils/fileFormParse'
import fetchProject from '../../../services/fetchProject'
import parseOldFiles from '../../../utils/parseOldFiles'
import icons from '../../../assets/icons/socialmedia/socialmedia'
import Loader from '../../../assets/components/loader/Loader'
import Modal from '../../../assets/components/modal/Modal'
import Success from '../../../assets/components/success/Success'
import useModal from '../../../hooks/useModal'

const selectItems = [
  'Active',
  'Upcoming',
  'Ended'
]

const socialItems = [
  {
      icon:icons.discord,
      isSelect:false,
      alt:'discord',
      link:''
  },
  {
      icon:icons.telegram,
      isSelect:false,
      alt:'telegram',
      link:''
  },
   {
      icon:icons.medium,
      isSelect:false,
      alt:'medium',
      link:''
  },
 {
      icon:icons.twitter,
      isSelect:false,
      alt:'twitter',
      link:''
  },
  {
      icon:icons.facebook,
      isSelect:false,
      alt:'facebook',
      link:''
  },
  {
      icon:icons.tikTok,
      isSelect:false,
      alt:'tikTok',
      link:''
  },
  {
      icon:icons.instagram,
      isSelect:false,
      alt:'instagram',
      link:''
  },
  {
    icon:icons.web,
    isSelect:false,
    alt:'web-site',
    link:''
},
]

const participantsItemsInitial = [
  {title:'Investors',name:'investors'},
  {title:'Team',name:'team'},
  {title:'Partners',name:'partners'},
]

const inputs = [
  {
    label:'Name:',
    name:'title', 
    placeholder:'SharkRace Cd...',
  },
  {
    label:'Short Description:',
    name:'description', 
    placeholder:'Short Description...',
  },
  {
    label:'Field:',
    name:'field', 
    placeholder:'Field name...',
  },
  {
    label:'Funding Goal:',
    name:'goal', 
    placeholder:'$1,8M',
  },
  {
    label:'Type:',
    name:'type', 
    placeholder:'Seed',
  },
  {
    label:'Time start:',
    name:'timeStart', 
    placeholder:'24:00',
  },
  {
    label:'Time end:',
    name:'timeEnd', 
    placeholder:'24:00',
  },
]

export default function CreateProject({type,status,id}) {
  const router = useRouter()
  const {modalHandler,state} = useModal()
  const [loading,setLoading] = useState(false)
  const [data,setData] = useState(() => (
    {
      title:'',
      description:'',
      dates:{
        from: 'ТBA',
        to:'ТBA'
      },
      status:status,
      field:'',
      goal:'',
      type:'',
      rating:3,
      isClosed:false,
      path:type,
      funded:'$0.00 (0%)',
      descriptionFull:'',
      lastFunding:'None',
      links:[],
      timeEnd:'24:00',
      timeStart:'24:00'
    }
  ))
  const [socialmedia,setSocialmedia] = useState([])
  const [participants,setParticipants] = useState(() => (
    {
      team:[],
      investors:[],
      partners:[],
    }
  ))

  const [isEdit,setIsEdit] = useState(false)
  const [oldFiles,setOldFiles] = useState([])
  const [logo,setLogo] = useState(null)
  const [descriptionFile,setDescriptionFile] = useState(null)
  const participantsTmp = useRef(participants)
  const linksTmp = useRef(participants)

  const inputsHandler = useCallback((name,value = '') => {
    setData({...data, [name] : value})
  },[data])

  const oldFilesHandler = (target) => {
    const isOldFile = oldFiles.find((item) => item.img === target)
    if(!isOldFile) return

    setOldFiles((state) => (
      state.map((file) => {
        if(file.img === target){
          return {...file,remove:true}
        }
        return file
      })
    ))
  }

  const filesHandler = useCallback((event,index,oldFile) => {
    oldFile && oldFilesHandler(oldFile)

    if(event.target.getAttribute('name') === 'logo'){
      setLogo(event.target.files[0])
    }else{
      setDescriptionFile(event.target.files[0])
    }

  },[logo,descriptionFile,data])

  const socialMediaHandler = useCallback((event,target) => {
    if(event.target.id === 'link'){
      setSocialmedia(socialmedia.map((item,index) => {
        if(index === target){
            return {...item,link : event.target.value}
        }
        return item
      }))
    }
    if(event.target.id.includes('checked')){
      setSocialmedia(socialmedia.map((item,index) => {
        if(index === target){
            return {...item,isSelect : !item.isSelect}
        }
        return item
      }))
    }
},[socialmedia])

  const participantHandler = useCallback((name,items) => {
    setParticipants({...participants,[name]:items})
  },[participants])
  
  const create = async () => {
    const proejctData = new FormData()
    fileFormParse(participants.investors,'investor',proejctData)
    fileFormParse(participants.team,'team',proejctData)
    fileFormParse(participants.partners,'partner',proejctData)
    proejctData.append('data',JSON.stringify(
      {...data,socialmedia:socialmedia.filter((item) => item.isSelect),
      team:participants.team,
      investors:participants.investors,
      partners:participants.partners,
      }))
    proejctData.append('logo',logo)
    proejctData.append('descriptionFile',descriptionFile)
    setLoading(true)
    const {success} = await createProject(proejctData,type)
    setLoading(false)
    if(success){
      modalHandler(null,true)
    }else{
      alert('Uploading error')
    }
  }

  const edit = async () => {
    const proejctData = new FormData()
    fileFormParse(participants.investors,'investor',proejctData)
    fileFormParse(participants.team,'team',proejctData)
    fileFormParse(participants.partners,'partner',proejctData)
    proejctData.append('data',JSON.stringify(
      {...data,socialmedia:socialmedia.filter((item) => item.isSelect),
      team:participants.team,
      investors:participants.investors,
      partners:participants.partners,
      }))
    proejctData.append('logo',logo)
    proejctData.append('descriptionFile',descriptionFile)
    proejctData.append('oldFiles',JSON.stringify(oldFiles))
    setLoading(true)
    const {success} = await editProject(id,proejctData,type)
    setLoading(false)
    if(success){
      modalHandler(null,true)
    }else{
      alert('Uploading error')
    }
  }

  useEffect(() => {
    const getProjectById = async (id) => {
      setLoading(true)
      const {success,project} = await fetchProject(id,type)
      if(success){
        const files = parseOldFiles(project)
        setOldFiles(files)
        setSocialmedia([
          ...project.socialmedia,
          ...socialItems.filter((item) => {
            return !project.socialmedia.find((pr) => pr.alt === item.alt)})
        ])
        participantsTmp.current = {
          team:project.team,
          partners:project.partners,
          investors:project.investors
        }
        linksTmp.current = project.links
        setData(project)
        setIsEdit(true)
        setLoading(false)
      }else{
        alert(`Project ${id} not finded`)
        router.push('/admin')
      }
    }
    if(id){
      getProjectById(id)
    }else{
      setSocialmedia(socialItems)
    }
  },[id])

  if(loading){
    return (
      <Loader/>
    )
  }

  return (
    <>
    <div className={styles.body}>
      <div className={styles.head}>
        <div className={styles.title}>
          <h2>Create {type}</h2>
        </div>
        <div className={styles.createBtn}>
          {
            isEdit
            ?
            <SquareBtn handler={edit} type='red' width={'200'} text={'Save'}/>
            :
            <SquareBtn handler={create} type='red' width={'200'} text={'Create'}/>
          }
        </div>
      </div>
      <div className={styles.inputsBlock}>
      <div className={styles.inputs}>
        {inputs.map((input,index) => {
          return(
            <div key={input.name} className={styles.input}>
            <Input 
            label={input.label} 
            name={input.name} 
            handler={inputsHandler} 
            value={data[input.name]} 
            placeholder={input.placeholder}/>
            </div>
          )
        })}
      </div>

      <hr className={styles.line}/>

      <div className={styles.customInputs}>
          <div className={styles.select}>
            <div className={styles.subTitle}>
                Status:
            </div>
            <Select items={selectItems} name={'status'} value={status} handler={inputsHandler}/>
          </div>

          <div className={styles.calendar}>
            <div className={styles.subTitle}>
              Start - End:
            </div>
            <CustomCalender stateHandler={inputsHandler} name={'dates'} dates={data.dates}/>
          </div>

          <div className={styles.file}>
            <div className={styles.subTitle}>
              <span>Logo (jpg/png/svg, 64x64)</span>:
            </div>
            <FileInput oldValue={data?.img} value={logo} handler={filesHandler} label={'logo'}/>
          </div>

          <div className={styles.file}>
            <div className={styles.subTitle}>
              <span>Description img/video, 600x330</span>:
            </div>
            <FileInput 
            oldValue={data?.projectImg}
            accept={'image/*, video/mp4, video/x-m4v, video/*'} 
            name={'description'} 
            value={descriptionFile} 
            handler={filesHandler} 
            label={'Description file'}/>
          </div>

          <div className={styles.rating}>
            <div className={styles.subTitle}>
              <span>Rating: </span>
            </div>
            <RatingSelect handler={inputsHandler} name={'rating'}/>
          </div>

      </div>

      <div className={styles.socialMedia}>
          <div className={styles.socialTitle}>
            <h2>Social media</h2>
          </div>
          <SocialMedia 
          projectSocialMedia={socialmedia} 
          name={'socialmedia'} 
          handler={socialMediaHandler}/>
      </div>

      <div className={styles.links}>
        <div className={styles.linksTitle}>
          <h2>Documentation links</h2>
        </div>
        <DocumentationLinks projectLinks={linksTmp.current} name={'links'} handler={inputsHandler}/>
      </div>

      <div className={styles.participants}>
        {participantsItemsInitial.map((item) => {
          return(
          <div key={item.title} className={styles.participant}>
            <div className={styles.title}><h2>{item.title}</h2></div>
            <Participants 
            oldFilesHandler={oldFilesHandler}
            setParticipants={setParticipants}
            participantsItems={participantsTmp.current[item.name]}
            participantName={item.name} 
            handler={participantHandler} 
            title={item.title}/>
          </div>
          )
        })}
      </div>

      <hr className={styles.line}/>

      <div className={styles.description}>
        <div className={styles.descriptionTitle}><h2>Description</h2></div>
        <TextEditor value={data.descriptionFull} name={'descriptionFull'} handler={inputsHandler}/>
      </div>

      </div>
    </div>
    <Modal handler={modalHandler} isVisible={state}>
      <Success/>
      <div className={styles.successBtn}>
        <SquareBtn 
        width='340'
        text={'Go to home page'} 
        handler={() => router.push('/admin')}/>
      </div>
    </Modal>
   </>
  )
}
