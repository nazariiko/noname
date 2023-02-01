import styles from '../styles/table-item.module.scss'

export default function TableItem({item}) {
  return (
    <div className={styles.item}>
      <div className={styles.body}>
          <span className={styles.bold}>{item.pool}</span>
          <span className={styles.bold}>{item.Amount}</span>
          <div className={styles.mobileDates}>
            <span className={styles.mobileDate}>{item.lockDate}</span>
            <span className={styles.mobileDate}>{item.unlockDate}</span>
          </div>
          <span className={styles.date}>{item.lockDate}</span>
          <span className={styles.date}>{item.unlockDate}</span>
          <button className={styles.btn}>{item.action}</button>
      </div>
      <hr className={styles.line}/>
    </div>
  )
}
