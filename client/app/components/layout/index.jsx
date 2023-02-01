import { useEffect, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { useDispatch , useSelector} from "react-redux"
import { closeModal } from "../../store/slices/modalsSlice"
import styles from './styles/index.module.scss'
import getHeader from '../../admin/services/headerServices/getHeader'
import getFooter from '../../admin/services/footerServices/getFooter'
import { setDiscord } from "../../store/slices/communitySlice"

export default function index({children}) {
  const [data,setData] = useState({
    header:{
      name:'',
      link:''
    },
    footer:{
      links:[],
      socialmedia:[]
    }
  })
  const dispatch = useDispatch()
  const modals = useSelector((state) => state.modals)

  useEffect(() => {
    const getData = async () => {
      try{
        const {header} = await getHeader()
        const {footer} = await getFooter()
        setData({header:header[0],footer:footer[0]})
        dispatch(setDiscord(footer[0].discordLink))
      }catch(error){
        console.log(error)
      }
    }
    getData()
  },[])

  const modalsHandler = (event) => {
    const id = event?.target?.id
    if(modals.search.state && id !== 'toggle-modal'){
      dispatch(closeModal('search'))
    }
    if(modals.wallet.state){
      dispatch(closeModal('wallet'))
    }
    if(modals.settings.state){
      dispatch(closeModal('settings'))
    }
  }

  return (
    <div className={styles.body} onClick={modalsHandler}>
      <Header headerData={data.header}/>
      {children}
      <Footer footerData={data.footer}/>
    </div>
  )
}
