import ListingCardHeader from "./ListingCardHeader";

const ProjectDescription = ({projectDetail}) => {
    return (
      <div className="pro_description">
          <ListingCardHeader name={projectDetail.project.name} projectStatus={projectDetail.project.status.live} isRefundable={projectDetail.project.status.refundable} />
        <h6>Description</h6>
        <p>
         {projectDetail.project.description}
        </p>
        
        <h6 className="">Features</h6>
        <ul className="">
          <li><strong>{projectDetail.project.features[0].title}:</strong> {projectDetail.project.features[0].description}</li>
          <li><strong>{projectDetail.project.features[1].title}:</strong> {projectDetail.project.features[1].description}</li>
          <li><strong>{projectDetail.project.features[2].title}:</strong> {projectDetail.project.features[2].description}</li>
        </ul>
      </div>
    );
  };


  export  default ProjectDescription;