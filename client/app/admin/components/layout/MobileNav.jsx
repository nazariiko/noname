import styles from '../../styles/mobile-nav.module.scss'
import Link from 'next/link'
import {BsArrowBarRight} from 'react-icons/bs'
import { AiFillSetting } from 'react-icons/ai'
import SettingsModal from '../settingsModal/SettingsModal'
import useModal from '../../../hooks/useModal'

const links = [
    {
        name:'Home',
        href:'/admin',
    },
    {
        name:'Bussiness',
        href:'/admin/bussiness',
    },
    {
        name:'Donates',
        href:'/admin/donates',
    },
    {
        name:'News',
        href:'/admin/news',
    },
    {
        name:'Calendar',
        href:'/admin/calendar',
    },
    {
        name:'Banner',
        href:'/admin/banner',
    },
    {
        name:`
        Footer
        &
        Header
        `,
        href:'/admin/settings'
    }
]

export default function MobileNav({handler,isVisible}) {
    const {state,modalHandler} = useModal()

  return (
    <div onClick={handler} id={'modal'} className={isVisible ? styles.modal + ' ' + styles.visible : styles.modal}>
    <nav className={isVisible ? styles.body + ' ' + styles.visible : styles.body}>
        <ul className={styles.colum}>
            {links.map((link,index) => {
                return (
                    <li key={index} className={styles.link}>
                        <Link href={link.href}>
                            <span>{link.name}</span>
                            <span className={styles.arrow}><BsArrowBarRight/></span>
                        </Link>
                    </li>
                )
            })}
            <li className={styles.link}>
                <button onClick={modalHandler} id='toggle-modal'>
                    <span id='toggle-modal'>Settings</span>    
                    <AiFillSetting id='toggle-modal'/>
                </button>
            </li>
        </ul>
    </nav>
    <SettingsModal 
    state={state} 
    modalHandler={modalHandler}
    />
    </div>
  )
}
