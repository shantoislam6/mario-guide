import React, { useEffect } from "react";
import Moment from "react-moment";
import { useParams, useHistory } from "react-router-dom";
import { EditButton } from "../childs/button";
import DeleteProjectButton from "./DeleteProjectButton";
import useSingleProject from "./useSingleProject";
import { useSelector } from "react-redux";
import { PreloaderTemplate } from "../childs/Preloader";
import useFirestoreStateCount from "../hooks/useFireStoreStateCount";

const ProjectDetails = props => {
  const { id } = useParams();
  const project = useSingleProject(id);
  const history = useHistory();
  const { uid } = useSelector(state => state.firebase.auth);
  const firestoreStateCount = useFirestoreStateCount();

  useEffect(() => {
    if (project !== undefined && firestoreStateCount > 0 && project == null) {
      history.push("/dashboard/myprojects");
    }
  });

  return (
    <div className="container section project-details">
      {project !== undefined && firestoreStateCount > 0 ? (
        project != null ? (
          <div className="card animated fadeIn faster">
            <div className="card-content">
              {uid === project.uid ? (
                <EditButton
                  size="large"
                  type="Link"
                  to={`/editproject/${project.id}`}
                />
              ) : (
                ""
              )}

              <h4 className="card-title text-bold">{project.title}</h4>
              <p>{project.content}</p>
            </div>
            <div className="card-action  grey-text ">
              <div>Posted By The {project.uFirstName} {project.uLastName}</div>
              <div>
                <Moment  fromNow>{project.created_at}</Moment>
              </div>
            </div>
            {uid === project.uid ? (
              <DeleteProjectButton uid={project.uid} id={project.id} />
            ) : (
              ""
            )}
          </div>
        ) : (
          <h5>No Projects Yet...</h5>
        )
      ) : (
        <PreloaderTemplate />
      )}
    </div>
  );
};

export default ProjectDetails;
