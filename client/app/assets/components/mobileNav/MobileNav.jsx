import styles from './mobile.module.scss'
import PinkBtn from '../../../components/UI/buttons/PinkBtn';
import UserSettings from '../../../components/userSettings/UserSettings'
import Link from 'next/link'

const MobileNav = ({isAuth,walletsHandler,isVisible,modalHandler,links,user,disconnect}) => {
    return (
        <div onClick={modalHandler} id={'modal'} className={isVisible ? styles.modal + ' ' + styles.visible : styles.modal}>
            <nav className={styles.nav}>
                <ul className={isVisible ? styles.links + ' ' + styles.visible : styles.links}>
                <div  className={isVisible ? styles.wlBtn : styles.hide}>
                    {
                        isAuth
                        ?
                        <UserSettings disconnect={disconnect} user={user}/>    
                        :
                        <PinkBtn handler={walletsHandler} text={'Connect wallet'} />
                    }
                </div>
                {links.map((link,index) => {
                    return <li key={index}><Link id='modal' className={styles.link} href={link.href}>{link.title}</Link></li>
                })}
                </ul>
            </nav>
        </div>
    );
}

export default MobileNav;
