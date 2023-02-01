import styles from '../styles/welcome.module.scss'
import Title from '../../assets/components/title/Title'
import Text from '../../assets/components/text/Text'
import MainBtn from '../UI/buttons/MainBtn'
import Form from '../../assets/components/form/Form'
import useModal from '../../hooks/useModal'

export default function Welcome() {
  const {modalHandler,state} = useModal()


  return (
    <div className={styles.welcome}>
        <Title className={styles.title} title={'Welcome Entrepreneurs, Investors '}/>
        <Text className={styles.text} 
        text={'Find engaging project to invest or start your own business'}/>
        <MainBtn handler={modalHandler}/>
        <Form handler={modalHandler} isVisible={state}/>
    </div>
  )
}
