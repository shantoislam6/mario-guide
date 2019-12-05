import React, { useRef } from "react";
import { createProject } from "../../store/actions/projectActions";
import { useDispatch } from "react-redux";
import { SubmitButton } from "../childs/button";
import { flash } from "../childs/FlashMessage";

const CreateProject = props => {
  const dispatch = useDispatch();

  const titleRef = useRef();
  const contentRef = useRef();

  function createProjectHandler(e) {
    e.preventDefault();
    const title = titleRef.current;
    const content = contentRef.current;

    if (title.value !== "" && content.value !== "") {
      dispatch(
        createProject({
          title: title.value,
          content: content.value
        })
      );
    } else {
      flash({
        type: "danger",
        message: "All Fields Required"
      });
    }
  }

  return (
    <div className="container">
      <div className="row">
        <form
          style={{ marginTop: "50px", padding: "30px" }}
          onSubmit={createProjectHandler}
          className="white offset-m2 offset-s0 col s12 m8 animated fadeIn faster"
        >
          <h3 className="grey-text center text-darken-3">Create Project</h3>
          <div className="input-field">
            <input
              placeholder="Project Title"
              ref={titleRef}
              type="text"
              id="title"
            />
          </div>
          <div className="input-field">
            <textarea
              id="content"
              placeholder="Project Content"
              cols="30"
              rows="10"
              ref={contentRef}
              className="materialize-textarea"
            />
          </div>
          <div className="input-field ">
            <SubmitButton  size="large" async={true}>
              Create Project
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
