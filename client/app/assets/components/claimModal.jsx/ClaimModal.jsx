import styles from './claim-modal.module.scss'
import StakingTable from '../../../components/stakingTable/StakingTable'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'

const stakingItems = [
    {
      pool:'BREED',
      Amount:'$1.8M',
      lockDate:'18 Nov, 2022 23:45',
      unlockDate:'20 Nov, 2022 23:45',
      action:'Claim'
    },
    {
      pool:'BREED',
      Amount:'$1.8M',
      lockDate:'18 Nov, 2022 23:45',
      unlockDate:'20 Nov, 2022 23:45',
      action:'Claim'
    },
    {
      pool:'BREED',
      Amount:'$1.8M',
      lockDate:'18 Nov, 2022 23:45',
      unlockDate:'20 Nov, 2022 23:45',
      action:'Claim'
    },
    {
      pool:'BREED',
      Amount:'$1.8M',
      lockDate:'18 Nov, 2022 23:45',
      unlockDate:'20 Nov, 2022 23:45',
      action:'Claim'
    },
    {
      pool:'BREED',
      Amount:'$1.8M',
      lockDate:'18 Nov, 2022 23:45',
      unlockDate:'20 Nov, 2022 23:45',
      action:'Claim'
    },
    {
      pool:'BREED',
      Amount:'$1.8M',
      lockDate:'18 Nov, 2022 23:45',
      unlockDate:'20 Nov, 2022 23:45',
      action:'Claim'
    },
]
  
export default function ClaimModal() {
  return (
    <div id='claim-modal' className={styles.body}>
      <StakingTable boxShadow='none' height={'300'} items={stakingItems}/> 
      <div className={styles.btn}>
       <SquareBtn text={'Claim All'} width={'867'}/>
      </div>
    </div>
  )
}
