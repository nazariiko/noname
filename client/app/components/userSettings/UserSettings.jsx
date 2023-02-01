import styles from '../styles/user-settings.module.scss';
import icons from '../../assets/icons/user/user';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../store/slices/modalsSlice';
import TelegramAuth from '../telegramAuth/TelegramAuth';
import authTelegram from '../../services/telegramAuth';

export default function UserSettings({ disconnect, user }) {
  const state = useSelector((state) => state.modals.settings.state);
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  const [telegramLoginStatus, setTelegramLoginStatus] = useState('idle');
  const [telegramUser, setTelegramUser] = useState(null);

  const showTelegramLoginButton = () => {
    setTelegramLoginStatus('pending');
  };

  const handleAuth = async (user) => {
    console.log(user);
    if (user.id) {
      setTelegramUser(user);
      setTelegramLoginStatus('success');
    } else {
      setTelegramLoginStatus('error');
    }
    const {success } = await authTelegram(user)
    console.log(success);
  };

  useEffect(() => {
    if (!telegramUser) {
      setTelegramLoginStatus('idle');
    }
  }, [state]);

  const transitionStyles = {
    entering: { opacity: 1, visibility: 'visible' },
    entered: { opacity: 1, visibility: 'visible' },
    exiting: { opacity: 0, visibility: 'hidden' },
    exited: { opacity: 0, visibility: 'hidden' },
  };

  const rotateStyles = {
    entering: { transform: 'rotate(180deg)' },
    entered: { transform: 'rotate(180deg)' },
    exiting: { transform: 'rotate(0deg)' },
    exited: { transform: 'rotate(0deg)' },
  };

  return (
    <div className={styles.modalBody}>
      <Transition in={state} timeout={1000}>
        {(state) => {
          return (
            <div onClick={() => dispatch(toggleModal('settings'))} className={styles.button}>
              <div className={styles.photo}>
                <Image src={icons.photo} alt={'user-photo'} />
              </div>
              <span className={styles.username}>{user?.address ? user.address : 'Username'}</span>
              <div style={{ ...rotateStyles[state] }} className={styles.arrow}>
                <Image src={icons.arrow} alt={'arrow'} />
              </div>
            </div>
          );
        }}
      </Transition>

      <Transition in={state} timeout={1000}>
        {(state) => {
          return (
            <div
              id="toggle-modal"
              style={{ ...transitionStyles[state] }}
              ref={nodeRef}
              className={styles.modal}>
              <div className={styles.row}>
                <span className={styles.key}>Partners:</span>
                <span className={styles.value}>22</span>
              </div>
              <div className={styles.row}>
                <span className={styles.key}>Balance:</span>
                <span className={styles.value}>{user?.balance ? user.balance : '2,054.45'}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.key}>Awards:</span>
                <span className={styles.value}>22</span>
              </div>

              <div className={styles.btns}>
                <div className={styles.row}>
                  <button className={styles.btn}>
                    <Image alt={'stale'} src={icons.stake} />
                    <span>Stake</span>
                  </button>
                </div>
                <div className={styles.row}>
                  <button className={styles.btn}>
                    <Image alt={'claim'} src={icons.claim} />
                    <span>Claim</span>
                  </button>
                  <span className={styles.value}>2,054.45</span>
                </div>
                <div className={styles.row}>
                  <button className={styles.btn}>
                    <Image alt={'nft'} src={icons.nft} />
                    <span>NFT</span>
                  </button>
                </div>
                <div className={styles.row}>
                  <button className={styles.btn}>
                    <Image alt={'connect'} src={icons.connect} />
                    <span>Connect another wallet</span>
                  </button>
                </div>
                {telegramLoginStatus === 'pending' ? (
                  <TelegramAuth handleAuth={handleAuth} />
                ) : telegramLoginStatus === 'success' ? (
                  <div style={{ display: 'flex' }}>
                    <p>{telegramUser.username}</p>
                  </div>
                ) : (
                  <div className={styles.row}>
                    <button onClick={() => showTelegramLoginButton()} className={styles.btn}>
                      <Image alt={'telegram'} src={icons.telegram} />
                      <span>Connect Telegram</span>
                    </button>
                  </div>
                )}
                <div className={styles.row}>
                  <button className={styles.btn}>
                    <Image alt={'copy'} src={icons.copy} />
                    <span>Copy referall link</span>
                  </button>
                </div>
              </div>
              <div className={styles.logout}>
                <button onClick={disconnect} type={'button'}>
                  Log out
                </button>
              </div>
            </div>
          );
        }}
      </Transition>
    </div>
  );
}
