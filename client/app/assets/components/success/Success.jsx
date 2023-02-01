import styles from './success.module.scss'
import Image from 'next/image';
import successSvg from '../../icons/complete.svg'

const Success = () => {
    return (
        <div className={styles.body}>
            <Image src={successSvg} alt='success'/>
            <div className={styles.title}>
                Success!
            </div>
        </div>
    );
}

export default Success;
