import React, { useRef, useEffect } from "react";
import { updateProject } from "../../store/actions/projectActions";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SubmitButton } from "../childs/button";
import { useModal } from "../../providers/ModalProvider";
import useSingleProject from "./useSingleProject";
import { flash } from "../../components/childs/FlashMessage";
import { PreloaderTemplate } from "../childs/Preloader";
import useFirestoreStateCount from "../hooks/useFireStoreStateCount";

const EditProject = props => {
  // Use Hooks
  const dispatch = useDispatch();
  const modal = useModal();
  const { id } = useParams();
  const project = useSingleProject(id);
  const history = useHistory();
  const titleRef = useRef();
  const contentRef = useRef();
  const firestoreStateCount = useFirestoreStateCount();

  function editProjectHandler(e) {
    const title = titleRef.current;
    const content = contentRef.current;

    e.preventDefault();
    if (title.value !== "" && content.value !== "") {
      if (title.value === project.title && content.value === project.content) {
        flash({
          type: "danger",
          message: "You Didn't Modified Anything!!"
        });
      } else {
        //Pass the exam
        modal("Are You Sure To Update?", function() {
          return function() {
            // action for yes
            dispatch(
              updateProject(id, project.uid, {
                title: title.value,
                content: content.value,
                uid: project.uid,
                created_at: project.created_at,
                updated_at: project.updated_at
              })
            );
          };
        });
      }
    } else {
      flash({
        type: "danger",
        message: "All Fields Required!!"
      });
    }
  }

  useEffect(() => {
    if (project !== undefined && firestoreStateCount > 0 && project == null) {
      history.push("/dashboard/myprojects");
    }
  });

  return (
    <div className="container">
      {project !== undefined && firestoreStateCount > 0 ? (
        project != null ? (
          <div className="row">
            <form
              style={{ marginTop: "50px", padding: "30px" }}
              onSubmit={editProjectHandler}
              className="white offset-m2 offset-s0 col s12 m8 animated fadeIn faster"
            >
              <h3 className="grey-text center text-darken-3">Edit Project</h3>
              <div className="input-field">
                <input
                  placeholder="Project Title"
                  type="text"
                  defaultValue={project.title}
                  ref={titleRef}
                  id="title"
                />
              </div>
              <div className="input-field">
                <textarea
                  id="content"
                  placeholder="Project Content"
                  cols="30"
                  rows="10"
                  className="materialize-textarea"
                  defaultValue={project.content}
                  ref={contentRef}
                />
              </div>
              <div className="input-field ">
                <SubmitButton async={true}>Update Project</SubmitButton>
              </div>
            </form>
          </div>
        ) : (
          <h5>Sorry!!Project is Not Found!!</h5>
        )
      ) : (
        <PreloaderTemplate />
      )}
    </div>
  );
};

export default EditProject;
