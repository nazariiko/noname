import { useState, useEffect } from 'react'
import HeadBlock from '../../app/components/head/Head'
import Layout from '../../app/admin/components/layout/index'
import getAdmins from '../../app/admin/services/adminServices/getAdmins'
import Home from '../../app/admin/pages/Home'

// export async function getServerSideProps(ctx) {
//   try{
//     let token = ctx.req.headers.cookie
    
//     token = token && token.split('=')[1]

//     const {success,admins} = await getAdmins(token)
//     if(!success){
//       return { props: { admins :[]} }
//     }
//     return { props: { admins } }
    
//   }catch(error){
//     return { props: { admins:[] } }
//   }
// }

export default function Admin() {
  const [admins,setAdmins] = useState([])

  useEffect(() => {
    const getAdminsData = async () => {
      const {success,admins} = await getAdmins()
      setAdmins(admins)
    }
    getAdminsData()
  },[]) 

  return (
    < >
      <HeadBlock title={'Admin - Home'}/>
      <Layout>
        <Home admins={admins}/>
      </Layout>
    </>
  )
}
