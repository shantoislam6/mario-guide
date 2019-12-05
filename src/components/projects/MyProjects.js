import React from "react";
import ProjectSummary from "./ProjectSammury";
import { PreloaderTemplate } from "../childs/Preloader";
import useFirestoreStateCount from "../hooks/useFireStoreStateCount";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const MyProjects = () => {
  const firestoreStateCount = useFirestoreStateCount();
  const {uid} = useSelector(state=> state.firebase.auth);
  useFirestoreConnect([
    {
      collection: "projects",
      orderBy: ["created_at", "desc"],
      uid: uid,
    }
  ]);
  document.title = 'My Projects-Mario Plan';
  const projects = useSelector(state => state.firestore.ordered.projects);

  return (
    <div className="project-list section">
      <h5 className="grey-text darken-2" style={{ marginBottom: "20px" }}>
        My Projects List
      </h5>
      <hr />
      <br />
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

export default MyProjects;
