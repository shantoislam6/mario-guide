import React from "react";
import ProjectSummary from "./ProjectSammury";
import { PreloaderTemplate } from "../childs/Preloader";
import useFirestoreStateCount from "../hooks/useFireStoreStateCount";
import { useSelector } from "react-redux";
import { useFirestoreConnect, getFirebase } from "react-redux-firebase";

const ProjectList = () => {
  const firestoreStateCount = useFirestoreStateCount();
  useFirestoreConnect([
    {
      collection: "projects",
      orderBy: ["created_at", "desc"]
    }
  ]);

  const projects = useSelector(state => {
    if(state.firestore.errors.byQuery['projects?orderBy=created_at:desc']){
      const auth = getFirebase().auth();
      auth.signOut();
    }else{
      return state.firestore.ordered.projects;
    }
    
  });

  return (
    <div className="project-list section">
      <h5
        className="grey-text darken-3"
        style={{ marginBottom: "20px" }}
      >
        Projects List
      </h5>
      <hr />
      <br/>
      {projects !== undefined && firestoreStateCount > 0 ? (
        projects.length > 0 ? (
          projects.map(project => (
            <ProjectSummary project={project} key={project.id} />
          ))
        ) : (
          <h5 >No Projects Yet...</h5>
        )
      ) : (
        <PreloaderTemplate />
      )}
    </div>
  );
};

export default ProjectList;
