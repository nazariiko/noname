import { useState , useCallback , useEffect} from 'react';
import styles from '../layout/styles/nav.module.scss'
import Image from 'next/image';
import logo from '../../assets/img/logo.svg'
import Link from 'next/link';
import PinkBtn from '../UI/buttons/PinkBtn';
import Wallets from '../../assets/components/wallets/Wallets'
import Burger from '../../assets/components/burger/Burger';
import MobileNav from '../../assets/components/mobileNav/MobileNav';
import blockScroll from '../../utils/blockScroll';
import UserSettings from '../userSettings/UserSettings'
import { useWeb3Modal } from "@web3modal/react";
import { useDispatch , useSelector} from 'react-redux'
import {setUserData} from '../../store/slices/authSlice' 
import { useAccount} from 'wagmi'
import useWallet from '../../hooks/useWallet';
import useAuth from '../../hooks/useAuth';
import { toggleModal } from '../../store/slices/modalsSlice';
import SearchBar from '../../assets/components/searchBar/SearchBar';
const links = [
    {
        title:'Business',
        href:'/'
    },
    {
        title:'Donates',
        href:'/donates'
    },
    {
        title:'News',
        href:'/news'
    },
    {
        title:'Calendar',
        href:'/calendar'
    },
    {
        title:'Portfolio',
        href:'/portfolio'
    },
    {
        title:'Waiting list',
        href:'/waitinglist'
    },
]

const Nav = ({userData}) => {
    const walletState = useSelector((state) => state.modals.wallet.state)
    const [modal,setModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const [config,setConfig] = useState({})
    const {connectWallet} = useWallet()
    const {open} = useWeb3Modal();
    const dispatch = useDispatch()
    const {changeAccount} = useAuth()

    const disconnectHandler = () => {
        dispatch(setUserData({address:'',balance:'',isAuth:false}))
    }

    const { address, isConnected ,status} = useAccount({onConnect:changeAccount,onDisconnect:disconnectHandler})

    const walletsHandler = (event) => {
        if(event){
            event.preventDefault()
        }
        dispatch(toggleModal('wallet'))
    }
    
    const connect = async (config,wallet) => {
      if(wallet === 'Connect Wallet'){
        setConfig(config)
        open()
      }
      if(wallet === 'Metamask'){
        if(!window?.ethereum?.isMetaMask){
            setConfig(config)
            open()
            return
        }
        await connectWallet('Metamask',walletsHandler)
      }
      if(wallet === 'TrustWallet'){
        if(!window?.ethereum?.isTrustWallet){
            setConfig(config)
            open()
            return
        }
        await connectWallet('TrustWallet',walletsHandler)
      }
    }

    useEffect(() => {
        if(isConnected){
            changeAccount(address)
            walletsHandler(false)
        }
    },[isConnected])

    const modalHandler = (event) => {
        event.stopPropagation()
        if(event.target.id === 'brg-btn' || event.target.id === 'modal'){
            walletState && walletsHandler()
            setModal(!modal)
            blockScroll()
        }
    }

    return (
        <div onClick={modalHandler} className={styles.row}>
            <div className={styles.logo}>
                <Link href={'/'}>
                   <Image width={'128'} src={logo} alt='logo'/>
                </Link>
            </div>
            <div className={styles.input}>
                <SearchBar/>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.links}>
                {links.map((link,index) => {
                    return <li key={index}><Link className={styles.link} href={link.href}>{link.title}</Link></li>
                })}
                </ul>
            </nav>
            <div className={styles.btn}>
                {
                    userData.isAuth
                    ?
                    <UserSettings user={userData} disconnect={disconnectHandler}/>
                    :
                    <PinkBtn handler={walletsHandler} text={'Connect wallet'} href={''} id={'wallet-btn'}/>
                }
            </div>
            <div className={styles.wlModal}>
                <Wallets config={config} connect={connect} handler={walletsHandler} isVisible={walletState}/>
            </div>
            <Burger/>
            <MobileNav disconnect={disconnectHandler} user={userData} isAuth={userData.isAuth} walletsHandler={walletsHandler} isVisible={modal} modalHandler={modalHandler} links={links}/>
        </div>
    );
}

export default Nav;
