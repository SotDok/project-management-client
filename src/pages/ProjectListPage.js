import { useState, useEffect } from "react";
import ProjectCard from "./../components/ProjectCard";
import AddProject from "../components/AddProject";
import projectsService from "../services/projects.service";



function ProjectListPage() {

  

  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    
    projectsService.getAllProjects()
    .then((response) => setProjects(response.data))
    .catch((error) => console.log(error));
};

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, [] );

  
  return (
    <div className="ProjectListPage">
      
      <AddProject refreshProjects={getAllProjects} />
      
      { projects.map((project) => <ProjectCard key={project._id} {...project} />  )} 
       
    </div>
  );
}

export default ProjectListPage;

