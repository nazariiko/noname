import styles from '../styles/main.module.scss'
import Welcome from '../welcome/Welcome'
import Banner from '../banner/Banner'
import Projects from '../projects/Projects'
import Community from '../community/Community'

export default function Main({type,title,text}) {
  return (
    <main className={styles.main}>
      <Welcome/>
      <Projects type={type} title={title} text={text}/>
      <Banner/>
      <Community/>
    </main>
  )
}
