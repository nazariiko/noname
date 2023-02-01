import styles from '../../styles/header-settings.module.scss'
import Input from '../../UI/Input'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import { useState } from 'react'
import changeHeader from '../../services/headerServices/changeHeader'
import Modal from '../../../assets/components/modal/Modal'
import Success from '../../../assets/components/success/Success'
import useModal from '../../../hooks/useModal'
import Loader from '../../../assets/components/loader/Loader'

const HeaderSettings = ({headerData}) => {
    const [loading,setLoading] = useState(false)
    const {modalHandler,state} = useModal()
    const [data,setData] = useState(headerData[0])
    const inputsHandler = (name,value) => {
        setData({...data,[name]:value})
    }

    const save = async () => {
        try{
            setLoading(true)
            const {success} = await changeHeader(data)
            if(success){
                modalHandler(null,true)
            }
            setLoading(false)
        }catch(error){
            console.log(error);
        }
    }

    if(loading){
        <Loader/>
    }

    return (
        <>
        <div className={styles.body}>
            <div className={styles.title}>
                <h1>Header</h1>
            </div>
            <div className={styles.inputs}>
                <Input 
                name={'name'}
                handler={inputsHandler}
                value={data.name}
                label={'Name:'} 
                placeholder={'View on OpenSea'}
                />
                <Input 
                name={'link'}
                handler={inputsHandler}
                value={data.link}
                label={'Ref:'} 
                placeholder={'https://example.com'}
                />
            </div>
            <div className={styles.save}>
                <SquareBtn 
                handler={save}
                text={'Save'} 
                width={'450'}/>
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
    );
}

export default HeaderSettings;
