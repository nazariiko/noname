import HeadBlock from '../app/components/head/Head'
import Layout from '../app/components/layout/index'
import Main from '../app/components/main/Main'
import fetchProjects from '../app/services/fetchProjects.js'
import { useDispatch } from 'react-redux'
import {setProjects} from '../app/store/slices/allProjects'
import { useEffect } from 'react'

export async function getServerSideProps() {
  try{
    const {projects} = await fetchProjects()
    if(!projects){
      return { props: { projects :[]} }
    }
    return { props: { projects } }
    
  }catch(error){
    return { props: { projects:[] } }
  }
}

export default function Home({projects}) {
  const dispatch = useDispatch()

  useEffect(() => {
    if(projects){
      dispatch(setProjects(projects))
    }else{
      dispatch(setProjects([]))
    }
  },[])

  return (
    < >
      <HeadBlock title={'Home'}/>
      <Layout>
        <Main 
        type={'business'} 
        title={'Projects'}
        text={'Active projects for investments and other offerings '}/>
      </Layout>
    </>
  )
}

