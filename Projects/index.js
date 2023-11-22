////////////////////////// the redux is not used here //////////////////////////
// import React, { useEffect, useState } from "react";
// import { getData } from "../../adapters/fetch";
// import NavBar from "../../components/NavBar/NavBar";
// import "./index.scss";
// import Cards from "../../components/Cards";
// import Filter from "../../components/Filter";
// import LoadMoreButton from "../../components/LoadMoreButton";
// import Footer from "../../components/Footer/Footer";
// import {
//     QUERY_FILTER_PROJECTS,
//     QUERY_FILTER_PROJECTS_BY_A_TO_Z,
//     QUERY_FILTER_PROJECTS_BY_NEWEST_TO_OLDEST,
//     QUERY_FILTER_PROJECTS_BY_OLDEST_TO_NEWEST,
//     QUERY_FILTER_PROJECTS_BY_Z_TO_A,
//     QUERY_TO_FETCH_NEXT_PAGE_PROJECTS,
//     URL_PROJECTS,
// } from "../../helpers/constants/endpoints";

// function Projects() {
//     // this state to know witch filter is used during LoadMore projects
//     const [queryFilterData, setQueryFilterData] = useState("");
//     // this state to know on the first fetching projects with filter. It's set to true. so on the first fetch with a filter will set new data to projectData in order not to be added to the old data
//     const [firstFetchNewFilter, setFirstFetchNewFilter] = useState(true);

//     const [projectData, setProjectData] = useState({
//         projects: [],
//         nextPage: "",
//     });

//     // async function fetchData(url) {
//     async function fetchData(fetchRequirement) {
//         const { url, isFetchWithFilter = false } = fetchRequirement;
//         try {
//             const data = await getData(url);
//             if (data) {
//                 console.log(data);
//                 data.items.forEach((project) => {
//                     if (project.project_image_link.length === 0) {
//                         project.project_image_link =
//                             require("../../assets/images/default_project_img.svg").default;
//                     }
//                 });
//                 if (isFetchWithFilter) {
//                     setProjectData({
//                         projects: [...data.items],
//                         nextPage: firstFetchNewFilter
//                             ? data.nextpage.toString()
//                             : data.nextpage
//                             ? data.nextpage.toString()
//                             : "",
//                     });
//                     setFirstFetchNewFilter(false);
//                 } else {
//                     setProjectData({
//                         projects: [...projectData.projects, ...data.items],
//                         nextPage: data.nextpage ? data.nextpage.toString() : "",
//                     });
//                 }
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     }

//     // first load fetch
//     useEffect(() => {
//         if (projectData.projects.length === 0) {
//             fetchData({ url: URL_PROJECTS });
//         }
//     }, []);

//     // on click load more btn
//     const handleOnLoadMoreProjects = async (e) => {
//         if (projectData.nextPage.length === 0) {
//             return;
//         }

//         await fetchData({
//             url: `${URL_PROJECTS}?${
//                 QUERY_TO_FETCH_NEXT_PAGE_PROJECTS + projectData.nextPage
//             }&${queryFilterData ? queryFilterData : ""}`,
//         });
//     };

//     // on click one of the filter options btn
//     const handleOnClickFilterOption = async (e) => {
//         switch (e.target.value) {
//             // case 1
//             case "a-z":
//                 setQueryFilterData(
//                     QUERY_FILTER_PROJECTS +
//                         "=" +
//                         QUERY_FILTER_PROJECTS_BY_A_TO_Z
//                 );
//                 await fetchData({
//                     url: `${URL_PROJECTS}?${QUERY_FILTER_PROJECTS}=${QUERY_FILTER_PROJECTS_BY_A_TO_Z}`,
//                     isFetchWithFilter: true,
//                 });
//                 break;

//             // case 2
//             case "z-a":
//                 setQueryFilterData(
//                     QUERY_FILTER_PROJECTS +
//                         "=" +
//                         QUERY_FILTER_PROJECTS_BY_Z_TO_A
//                 );
//                 await fetchData({
//                     url: `${URL_PROJECTS}?${QUERY_FILTER_PROJECTS}=${QUERY_FILTER_PROJECTS_BY_Z_TO_A}`,
//                     isFetchWithFilter: true,
//                 });
//                 break;

//             // case 3
//             case "date-a-z":
//                 setQueryFilterData(
//                     QUERY_FILTER_PROJECTS +
//                         "=" +
//                         QUERY_FILTER_PROJECTS_BY_OLDEST_TO_NEWEST
//                 );
//                 await fetchData({
//                     url: `${URL_PROJECTS}?${QUERY_FILTER_PROJECTS}=${QUERY_FILTER_PROJECTS_BY_OLDEST_TO_NEWEST}`,
//                     isFetchWithFilter: true,
//                 });
//                 break;

//             // case 4
//             case "date-z-a":
//                 setQueryFilterData(
//                     QUERY_FILTER_PROJECTS +
//                         "=" +
//                         QUERY_FILTER_PROJECTS_BY_NEWEST_TO_OLDEST
//                 );
//                 await fetchData({
//                     url: `${URL_PROJECTS}?${QUERY_FILTER_PROJECTS}=${QUERY_FILTER_PROJECTS_BY_NEWEST_TO_OLDEST}`,
//                     isFetchWithFilter: true,
//                 });
//                 break;

//             default:
//                 break;
//         }
//         return;
//     };

//     return (
//         <div className="projects">
//             <header>
//                 <NavBar />
//             </header>
//             {projectData.projects?.length > 0 && (
//                 <main>
//                     <Filter>
//                         <button
//                             value={"a-z"}
//                             onClick={handleOnClickFilterOption}
//                         >
//                             A - Z
//                         </button>
//                         <button
//                             value={"z-a"}
//                             onClick={handleOnClickFilterOption}
//                         >
//                             Z - A
//                         </button>
//                         <button
//                             value={"date-a-z"}
//                             onClick={handleOnClickFilterOption}
//                         >
//                             Oldest - Newest
//                         </button>
//                         <button
//                             value={"date-z-a"}
//                             onClick={handleOnClickFilterOption}
//                         >
//                             Newest - Oldest
//                         </button>
//                     </Filter>

//                     <Cards
//                         allData={projectData.projects}
//                         onClickGoTo={"/project"}
//                     />
//                     <LoadMoreButton
//                         showLoadMore={projectData.nextPage}
//                         onClick={handleOnLoadMoreProjects}
//                     />
//                 </main>
//             )}
//             <Footer />
//         </div>
//     );
// }

// export default Projects;

//////////////////////////////// fake data ////////////////////////////////
// function Projects() {
//     const [projectData, setProjectData] = useState({
//         projects: [],
//         nextPage: "",
//     });

//     useEffect(() => {
//         setProjectData({
//             ...projectData,
//             projects: [
//                 {
//                     name: "Project 1",
//                     description:
//                         "Descriptioasdfasdf asdf asdf asdf asdf asdf asdf asdf weafasd fawef asdf asdf asdf asdf asdf asdf asdf asdf sdafas dfsadf asdf sadf sdn for Project 1",
//                     project_image_link: require("../../assets/images/Screenshot_6.png"),
//                 },
//                 {
//                     name: "OCCycling",
//                     description:
//                         "A platform to manage the free bicycle provision service given by OCC in a refugee camp in Greece to allow them to go to the city",
//                     repository_link: "https://github.com/hheiress/OCCycling",
//                     live_demo_link: "https://github.com",
//                     project_image_link:
//                         "https://666230843-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-MRebciU3NcuLgsX3ijf%2F-MVb5XncnoYEToFic_k6%2F-MVbCGfSvh7L9-UlBmjZ%2FfpTeam3.PNG?alt=media&token=7c35f842-d59d-45da-a178-c6bbc3b8993f",
//                     technologies_used: [
//                         "HTML",
//                         "CSS",
//                         "JavaScript",
//                         "React.js",
//                         "Database(SQL)",
//                     ],
//                     instructors_names: ["Nandan Rao"],
//                     team_member_names: [
//                         "Diana Dashkovska (TL)",
//                         "José Arriaga",
//                         "Anny Gómez",
//                         "Gustavo Rossini",
//                     ],
//                     team_member_roles: [
//                         "Team leader: Diana Dashkovska",
//                         "Fullstack developer: Anny Gómez",
//                         "Frontend developer: José Arriaga",
//                         "Backend developer: Gustavo Rossini",
//                         "Designer: Diana Dashkovska",
//                         "Designer: Diana José Arriaga",
//                     ],
//                     trello_link: "Trello link 10",
//                     product_presentation_link:
//                         "https://docs.google.com/document/d/1SOLHVUsEQX-OH8T2z_OXfwbBM1-DUXOdQWbSjgCI_WM/edit#heading=h.zi8nw4t10oa6",
//                     date_have_been_done: "30-09-2023",
//                     migracode_batch: "MAR23-1",
//                 },
//                 {
//                     name: "Project 1",
//                     description:
//                         "Descriptioasdfasdf asdf asdf asdf asdf asdf asdf asdf weafasd fawef asdf asdf asdf asdf asdf asdf asdf asdf sdafas dfsadf asdf sadf sdn for Project 1",
//                     project_image_link: "https://via.placeholder.com/150",
//                 },
//                 {
//                     name: "Project 1",
//                     description:
//                         "Descriptioasdfasdf asdf asdf asdf asdf asdf asdf asdf weafasd fawef asdf asdf asdf asdf asdf asdf asdf asdf sdafas dfsadf asdf sadf sdn for Project 1",
//                     project_image_link: "https://via.placeholder.com/150",
//                 },
//                 {
//                     name: "Project 1",
//                     description:
//                         "Descriptioasdfasdf asdf asdf asdf asdf asdf asdf asdf weafasd fawef asdf asdf asdf asdf asdf asdf asdf asdf sdafas dfsadf asdf sadf sdn for Project 1",
//                     project_image_link: "https://via.placeholder.com/150",
//                 },
//                 {
//                     name: "Project 1",
//                     description:
//                         "Descriptioasdfasdf asdf asdf asdf asdf asdf asdf asdf weafasd fawef asdf asdf asdf asdf asdf asdf asdf asdf sdafas dfsadf asdf sadf sdn for Project 1",
//                     project_image_link: "https://via.placeholder.com/150",
//                     date_have_been_done: "30-09-2023",
//                     migracode_batch: "MAR23-1",
//                 },
//             ],
//         });
//     }, []);

//     return (
//         <div className="projects">
//             <header>
//                 <NavBar />
//             </header>
//             {projectData.projects?.length > 0 && (
//                 <main>
//                     <Filter>
//                         <button>A - Z</button>
//                         <button>Z - A</button>
//                     </Filter>

//                     <Cards
//                         allData={projectData.projects}
//                         onClickGoTo={"/project"}
//                     />
//                     <LoadMoreButton />
//                 </main>
//             )}
//             <Footer />
//         </div>
//     );
// }

// export default Projects;

////////////////////////////////////////////////////////////////////////////////
import React, { useContext, useEffect, useRef, useState } from "react";
import { getData, postData } from "../../adapters/fetch";
import NavBar from "../../components/NavBar/NavBar";
import "./index.scss";
import Cards from "../../components/Cards";
import Filter from "../../components/Filter";
import LoadMoreButton from "../../components/LoadMoreButton";
import Footer from "../../components/Footer/Footer";
import {
    QUERY_FILTER_PROJECTS,
    QUERY_FILTER_PROJECTS_BY_A_TO_Z,
    QUERY_FILTER_PROJECTS_BY_NEWEST_TO_OLDEST,
    QUERY_FILTER_PROJECTS_BY_OLDEST_TO_NEWEST,
    QUERY_FILTER_PROJECTS_BY_Z_TO_A,
    QUERY_TO_FETCH_NEXT_PAGE_PROJECTS,
    URL_NEW_PROJECT,
    URL_PROJECTS,
} from "../../helpers/constants/endpoints";

import { useDispatch, useSelector } from "react-redux";
import {
    firstFetchedProjects,
    fetchMoreProjects,
    fetchingProjects,
    endFoFetchingProjects,
} from "../../redux/projects";
import Loader from "../../components/Loader";
import AddMoreCardButton from "../../components/AddMoreCardButton";
import ContainerFormAddMoreCard from "../../components/ContainerFormAddMoreCard";
import FormNewProject from "../../components/FormNewProject";

function Projects() {
    const addMoreCardBtnRef = useRef(null);
    const [openAddMoreCardButton, setOpenAddMoreCardButton] = useState(false);
    const [statusScrollY, setStatusScrollY] = useState(0);

    // const { logInState } = useSelector((store) => store);

    // useEffect(() => {
    //     console.log(logInState.isLoggedIn);
    // }, [logInState.isLoggedIn]);

    // to read redux projects state
    const { projectsState } = useSelector((store) => store);

    // to set redux state
    const dispatch = useDispatch();
    // console.log(projectsState);

    async function fetchData(fetchRequirement) {
        // queryFilterData to load more filtered data
        const { url, queryFilterData = ``, actionType = `` } = fetchRequirement;
        // fetchingProjects starting fetching projects // loader
        dispatch(fetchingProjects({}));
        try {
            const data = await getData(url);

            if (data) {
                // console.log(data);
                data.items.forEach((project) => {
                    if (project.project_image_link.length === 0) {
                        project.project_image_link =
                            require("../../assets/images/default_project_img.svg").default;
                    }
                });
                if (actionType === `FIRST_FETCH_DATA`) {
                    // firstFetchedProjects to set first fetched projects
                    dispatch(
                        firstFetchedProjects({
                            projects: [...data.items],
                            nextPage: data.nextpage
                                ? data.nextpage.toString()
                                : "",
                            queryFilterData,
                        })
                    );
                } else if (actionType === `FETCH_MORE_DATA`) {
                    // fetchMoreProjects to set more fetched projects
                    dispatch(
                        fetchMoreProjects({
                            projects: [...data.items],
                            nextPage: data.nextpage
                                ? data.nextpage.toString()
                                : "",
                        })
                    );
                } else {
                    throw new Error(
                        `The actionType ${actionType} is not supported`
                    );
                }
            }
        } catch (error) {
            console.log(error.message);
        }
        // endFoFetchingProjects end of fetching projects // loader
        dispatch(endFoFetchingProjects());
    }

    // first load fetch
    useEffect(() => {
        if (projectsState.projects.length === 0) {
            fetchData({ url: URL_PROJECTS, actionType: "FIRST_FETCH_DATA" });
        }
    }, [projectsState.projects]);

    useEffect(() => {
        // console.log(statusScrollY);
        setTimeout(() => {
            window.scrollTo(0, statusScrollY);
        }, 500);
    }, [statusScrollY]);

    // on click load more btn
    const handleOnLoadMoreProjects = async (e) => {
        e.preventDefault();
        // console.log("click", projectsState);

        if (projectsState.nextPage.length === 0) {
            return;
        }
        setStatusScrollY(document.body.scrollTop || window.scrollY);

        await fetchData({
            url: `${URL_PROJECTS}?${
                QUERY_TO_FETCH_NEXT_PAGE_PROJECTS + projectsState.nextPage
            }&${projectsState.queryFilterData}`,
            actionType: "FETCH_MORE_DATA",
        });
    };

    // on click one of the filter options btn
    const handleOnClickFilterOption = async (e) => {
        switch (e.target.value) {
            // case 1
            case "a-z":
                await fetchData({
                    url: `${URL_PROJECTS}?${QUERY_FILTER_PROJECTS}=${QUERY_FILTER_PROJECTS_BY_A_TO_Z}`,
                    queryFilterData:
                        QUERY_FILTER_PROJECTS +
                        "=" +
                        QUERY_FILTER_PROJECTS_BY_A_TO_Z,
                    actionType: "FIRST_FETCH_DATA",
                });
                break;

            // case 2
            case "z-a":
                await fetchData({
                    url: `${URL_PROJECTS}?${QUERY_FILTER_PROJECTS}=${QUERY_FILTER_PROJECTS_BY_Z_TO_A}`,
                    queryFilterData:
                        QUERY_FILTER_PROJECTS +
                        "=" +
                        QUERY_FILTER_PROJECTS_BY_Z_TO_A,
                    actionType: "FIRST_FETCH_DATA",
                });
                break;

            // case 3
            case "date-a-z":
                await fetchData({
                    url: `${URL_PROJECTS}?${QUERY_FILTER_PROJECTS}=${QUERY_FILTER_PROJECTS_BY_OLDEST_TO_NEWEST}`,
                    queryFilterData:
                        QUERY_FILTER_PROJECTS +
                        "=" +
                        QUERY_FILTER_PROJECTS_BY_OLDEST_TO_NEWEST,
                    actionType: "FIRST_FETCH_DATA",
                });
                break;

            // case 4
            case "date-z-a":
                await fetchData({
                    url: `${URL_PROJECTS}?${QUERY_FILTER_PROJECTS}=${QUERY_FILTER_PROJECTS_BY_NEWEST_TO_OLDEST}`,
                    queryFilterData:
                        QUERY_FILTER_PROJECTS +
                        "=" +
                        QUERY_FILTER_PROJECTS_BY_NEWEST_TO_OLDEST,
                    actionType: "FIRST_FETCH_DATA",
                });
                break;

            default:
                break;
        }
        return;
    };

    const handleClickAddMoreCard = (e) => {
        setOpenAddMoreCardButton(!openAddMoreCardButton);
    };

    const onSubmitForm = async (submittingOptions) => {
        const { isSubmitted, formData } = submittingOptions;

        setOpenAddMoreCardButton(!isSubmitted);

        let token = "";
        const cookies = document.cookie.split(";");
        cookies.map((cookie) => {
            const [name, value] = cookie.split("=");
            if (name.trim() === "login") {
                // console.log(value);
                if (value.trim()) {
                    token = value;
                }
            }
        });

        if (!token) {
            return alert(
                "you don't have access to add new project. Please login first!"
            );
        }
        try {
            const headers = {
                "Content-Type": "application/json",
                token: token,
            };
            const bodyData = formData;
            const data = await postData(URL_NEW_PROJECT, headers, bodyData);

            if (data) {
                console.log(data);

                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
        // console.log(formData);
        return;
    };
    return (
        <div className="projects">
            <header>
                <NavBar />
            </header>
            <main>
                {/* {logInState.isLoggedIn && ( */}
                <section className="AddCardContainer" ref={addMoreCardBtnRef}>
                    <AddMoreCardButton onClick={handleClickAddMoreCard} />

                    {openAddMoreCardButton && (
                        <ContainerFormAddMoreCard>
                            <button
                                className="closeFormNewProject"
                                onClick={() => {
                                    setOpenAddMoreCardButton(
                                        !openAddMoreCardButton
                                    );
                                }}
                            >
                                X
                            </button>
                            <FormNewProject onSubmitForm={onSubmitForm} />
                        </ContainerFormAddMoreCard>
                    )}
                </section>
                {/* )} */}

                {!projectsState.isFetching &&
                    projectsState.projects?.length > 0 && (
                        <>
                            <Filter>
                                <button
                                    value={"a-z"}
                                    onClick={handleOnClickFilterOption}
                                >
                                    A - Z
                                </button>
                                <button
                                    value={"z-a"}
                                    onClick={handleOnClickFilterOption}
                                >
                                    Z - A
                                </button>
                                <button
                                    value={"date-a-z"}
                                    onClick={handleOnClickFilterOption}
                                >
                                    Oldest - Newest
                                </button>
                                <button
                                    value={"date-z-a"}
                                    onClick={handleOnClickFilterOption}
                                >
                                    Newest - Oldest
                                </button>
                            </Filter>

                            <Cards
                                allData={projectsState.projects}
                                onClickGoTo={"/project"}
                            />
                            <LoadMoreButton
                                showLoadMore={projectsState.nextPage}
                                onClick={handleOnLoadMoreProjects}
                            />
                        </>
                    )}
                {!projectsState.isFetching &&
                    projectsState.projects?.length === 0 && (
                        <p className="onDataMessage">There is no Projects</p>
                    )}
            </main>
            {projectsState.isFetching && <Loader />}
            <Footer />
        </div>
    );
}
export default Projects;
