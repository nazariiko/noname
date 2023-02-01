import styles from './styles/header.module.scss'
import Nav from '../nav/Nav';
import { useSelector } from 'react-redux';


const Header = ({headerData}) => {
    const {userData} = useSelector((state) => state.auth)
    
    return (
        <header className={styles.header}>
            <div className={styles.rows}>
                <div className={styles.row}>
                        <div className={styles.rowItem}>
                            <span className={styles.textLight}>Total Investment:</span>  
                            <span className={styles.textWhite}>1.98 T USD</span>  
                        </div>
                        <div className={styles.rowItem}>
                            <a href={headerData.link} className={styles.textWhite}>{headerData.name}</a>  
                        </div>
                </div>
            </div>
            <Nav userData={userData}/>
        </header>
    );
}

export default Header;
