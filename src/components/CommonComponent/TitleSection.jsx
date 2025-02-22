import { Helmet } from "react-helmet-async";

const TitleSection = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Do Task</title>
    </Helmet>
  );
};

export default TitleSection;
