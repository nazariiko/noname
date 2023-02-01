import Layout from '../app/components/layout/index'
import HeadBlock from '../app/components/head/Head'
import Main from '../app/components/main/Main'
import fetchProjects from '../app/services/fetchProjects.js'
import { useDispatch } from 'react-redux'
import {setProjects} from '../app/store/slices/allProjects'
import { useEffect } from 'react'

export async function getServerSideProps() {
  const {projects} = await fetchProjects('donates')
  
  return { props: { projects } }
}


export default function donates({projects}) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProjects(projects))
  },[])

  return (
    <>
    <HeadBlock title={'Donates'}/>
    <Layout>
      <Main 
      type={'donates'} 
      title={'Donates'}
      text={'Help to rebuild Ukraine today'}
      />
    </Layout>
    </>
  )
}
