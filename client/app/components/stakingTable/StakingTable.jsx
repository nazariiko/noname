import styles from '../styles/staking-table.module.scss'
import TableItem from '../tableItem/TableItem'

export default function StakingTable({items,height='343',boxShadow = '4px 4px 10px #eeeeee'}) {
  return (
    <div style={{boxShadow:boxShadow}} className={styles.table}>
      <div className={styles.head}>
        <span>Pool</span>
        <span className={styles.amount}>Amount Staked</span>
        <div className={styles.mobileDates}>
          <span>Lock</span>
          <span> - </span>
          <span>Unlock Date</span>
        </div>
        <span className={styles.date}>Lock Date</span>
        <span className={styles.date}>Unlock Date</span>
        <span>Action</span>
      </div>
      <div  style={{height:`${height}px`}} className={styles.body}>
        {items.map((item,index) => {
            return <TableItem key={index} item={item}/>
        })}
      </div>
    </div>
  )
}
