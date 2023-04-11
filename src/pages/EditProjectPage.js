// src/pages/EditProjectPage.js

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectsService from "../services/projects.service";



function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();
  
useEffect(() => {

    projectsService.getProject(projectId)
    .then((response) => {
      const oneProject = response.data;
      setTitle(oneProject.title);
      setDescription(oneProject.description)
    })
    .catch((error) => console.log(error));
}, [projectId]);

// Create an object representing the body of the PUT request
const handleFormSubmit = (e) => {
  e.preventDefault();
  const requestBody = { title, description };


 // Make a PUT request to update the project
    projectsService.updateProject(projectId, requestBody)
    .then((response) => {
       // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/projects/${projectId}`)
    });
};

// DELETE functionality

const deleteProject = () => {
    projectsService.deleteProject(projectId)
    .then(() => {
      //navigate back to the list of projects when delete is successful
      navigate("/projects");
    })
    .catch((error) => console.log(error));
};


  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="ubmit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;
