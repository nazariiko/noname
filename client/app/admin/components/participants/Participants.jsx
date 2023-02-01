import { useState ,useCallback , useEffect} from 'react'
import Input from '../../UI/Input'
import FileInput from '../../UI/FileInput'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import styles from '../../styles/participants.module.scss'

export default function Participants({oldFilesHandler,participantsItems,participantName,handler}) {
  const [items,setItems] = useState([])
  
  const inputsHandler = useCallback((name,value = '',target) => {
    setItems(items.map((item,index) => {
      if(index === target){
        return {...item, [name] : value}
      }
      return item
    }))
  },[items])

  const filesHandler = useCallback((event,target,oldFile) => {
    oldFile && oldFilesHandler(oldFile)
    setItems(items.map((item,index) => {
      if(index === target){
        return (
          {...item,img:event.target.files[0]}
        )
      }
      return item
    }))
  },[items])

  const addItem = useCallback(() => {
    setItems([...items,{img:null,name:'',text:'',link:''}])
  },[items])

  const removeItem = useCallback((target) => {
    setItems(items.filter((item,index) => index !== target))
  },[items])

  useEffect(() => {
    handler(participantName,items)
  },[items])

  useEffect(() => {
    if(participantsItems?.length){
      setItems(participantsItems)
      participantsItems = []
    }
  },[participantsItems])

  return (
    <div className={styles.body}>
      <div className={styles.items}>
        {items.map((item,index) => {
          return(
            <div key={index} className={styles.item}>
              <FileInput
              index={index}
              accept={'image/png, image/jpeg'} 
              name={`${participantName}_img`} 
              value={item.img}
              handler={filesHandler} 
              label={'Img (64x64)'}
              oldValue={item?.img}
              />
              <Input 
              label={'Name'}
              value={item.name} 
              placeholder={'Dr. Laurent El Ghaul'} 
              name={'name'}
              index={index}
              handler={inputsHandler}/>
              <Input 
              label={'Text'}
              value={item.text} 
              placeholder={'Business manager'} 
              name={'text'}
              index={index}
              handler={inputsHandler}/>
               <Input 
              label={'Link'}
              value={item.link} 
              placeholder={'https://example.com'} 
              name={'link'}
              index={index}
              handler={inputsHandler}/>
              <button onClick={() => removeItem(index)} className={styles.remove}>Remove</button>
            </div>
          )
        })}
      </div>
      <div className={styles.addBtn}>
        <SquareBtn handler={addItem} text={'+'} width={'300'}/>
      </div>
    </div>
  )
}
