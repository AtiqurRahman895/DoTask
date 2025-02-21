import { Helmet } from "react-helmet-async";

const TitleSection = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Study Only</title>
    </Helmet>
  );
};

export default TitleSection;
