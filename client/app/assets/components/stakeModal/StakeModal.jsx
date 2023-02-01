import styles from './stake-modal.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import RangeInput from '../customRangeInput/RangeInput'

export default function StakeModal() {
  return (
    <div className={styles.body}>
        <div className={styles.row}>
            <div className={styles.item}>
                <span className={styles.key}>Locked for: </span>
                <span className={styles.value}>12 months</span>
            </div>
            <div className={styles.item}>
            </div>
        </div>
        <div className={styles.input}>
            <RangeInput/>
        </div>
        <div className={styles.maxBlock}>
            <span className={styles.maxValue}>0</span>
            <span className={styles.max}>Max</span>
        </div>
        <div className={styles.wallet}>
            <span className={styles.key}>
                Wallet: 0 BREED
            </span> 
        </div>
        <div className={styles.rowLast}>
            <span className={styles.key}>Est APR :</span>
            <span className={styles.value}>116%</span>
        </div>
        <SquareBtn type='red' text={'Approve'} width={'328'}/>
    </div>
  )
}
