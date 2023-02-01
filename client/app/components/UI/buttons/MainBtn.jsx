import styles from './main-btn.module.scss'

export default function MainBtn({handler}) {
  return (
    <button id='toggle-modal' onClick={handler} className={styles.main}>
      Join us
    </button>
  )
}
