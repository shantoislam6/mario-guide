import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { EditButton } from "../childs/button";
import DeleteProjectButton from "./DeleteProjectButton";
import { useSelector } from "react-redux";

const ProjectSammury = ({ project }) => {
  const { uid } = useSelector(state => state.firebase.auth);
  return (
    <div className="card project-summary z-depth-0 card animated fadeIn faster">
      <div className="card-content grey-text text-darken-3">
        {uid === project.uid ? (
          <EditButton
            size="small"
            type="Link"
            to={`/editproject/${project.id}`}
          />
        ) : (
          ""
        )}

        <span className="card-title">
          <Link to={`/project/${project.id}`}>{project.title}</Link>
        </span>
        <p>{project.content}</p>
        <p className="grey-text">
          <Moment fromNow>{project.created_at}</Moment>
        </p>
      </div>
      <div className="card-footer">
        {uid === project.uid ? (
          <DeleteProjectButton id={project.id} uid={project.uid} size="small" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProjectSammury;
