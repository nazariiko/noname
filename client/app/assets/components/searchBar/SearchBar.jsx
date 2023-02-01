import styles from "./search-bar.module.scss";
import TextField from "../../../components/UI/inputs/TextField";
import { useState, useMemo ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import useProjects from "../../../hooks/useProjects";
import { openModal, closeModal } from "../../../store/slices/modalsSlice";
import Link from "next/link";
import Image from "next/image";
import SearchProject from "../searchProject/SearchProject";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchState = useSelector((state) => state.modals.search.state);
  const { allProjects } = useProjects({});
  const dispatch = useDispatch();
  const searchHandler = (event) => {
    setSearchValue(event.target.value);
  };
  
  const result = useMemo(() => {
    if (!searchValue) return
    
    const projects = [];
    const donates = [];

    allProjects
      .filter((project) => {
        return String(project.title)
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      })
      .forEach((project) => {
        if (project.path === "donate") {
          donates.push(project);
        } else {
          projects.push(project);
        }
      });
    
    return { donates, projects };
  }, [searchValue]);

  useEffect(() => {
    if(searchValue){
      dispatch(openModal("search"));
    }else{
      dispatch(closeModal("search"));
    }
  }, [searchValue]);

  return (
    <div className={styles.body}>
      <TextField
        id="toggle-modal"
        value={searchValue}
        handler={searchHandler}
      />
      {searchState ? (
        (searchValue && result?.projects?.length) || result?.donates?.length ? (
          <div className={styles.searchResults}>
            {result.projects.length ? (
              <>
                <div id="toggle-modal" className={styles.type}>
                  Projects:
                </div>
                <SearchProject handler={() => dispatch(closeModal("search"))} projects={result.projects} />
              </>
            ) : (
              <></>
            )}

            {result.donates.length ? (
              <>
                <div className={styles.type}>Donates:</div>
                <SearchProject handler={() => dispatch(closeModal("search"))} projects={result.donates} />
              </>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className={styles.notFind}>
            <div className={styles.title}>Nothing was find...</div>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
