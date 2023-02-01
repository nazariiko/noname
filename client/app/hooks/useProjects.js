import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import fetchProjects from "../services/fetchProjects";

const useProjects = ({filter = null,find = ''}) => {
    const [filteredProjects,setFilteredProjects] = useState([])
    const [finded,setFinded] = useState({})
    const user = useSelector((state) => state.auth.userData)
    const [allProjects,setAllProjects] = useState(() => [])

    useEffect(() => {
        const getAllProjects = async () => {
            try{
                let {projects} = await fetchProjects()
                let donates = (await fetchProjects('donates')).projects
                
                projects = projects.map((item) => {
                    return item.projects
                }).flat()

                donates = donates.map((item) => {
                    return item.projects
                }).flat()

                return [...projects,...donates]
            }catch(error){
                console.log(error)
                return []
            }
        }

        getAllProjects().then((data) => setAllProjects(data))
    },[])
    

    useMemo(() => {
        if(find && allProjects.length){
            setFinded(allProjects.find((project) => {
                return String(project.id) === String(find)
            }))
        }
    },[find])

    useMemo(() => {
        if(filter && allProjects.length){
            setFilteredProjects(allProjects.filter((project) => {
                return filter.includes(project._id)
            }))
        }
    },[filter])

    return {allProjects:allProjects,filtered:filteredProjects,project:finded};
}

export default useProjects;
