import styles from '../styles/home.module.scss'
import Admins from '../components/admins/Admins';

const Home = ({admins}) => {
    return (
        <div className={styles.body}>
            <div className={styles.title}>
                <h1>Home page</h1>
            </div>
            <div className={styles.admins}>
                <Admins admins={admins}/> 
            </div>
        </div>
    );
}

export default Home;
