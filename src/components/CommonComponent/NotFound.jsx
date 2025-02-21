import notFoundImg from "../../assets/notFoundContent.svg"

const NotFound = ({ NotFoundText }) => {
  return (
    <div className="my-20 grid justify-items-center gap-3">
      <img src={notFoundImg} alt={`not available`} className="w-[200px]" />
      <h6 className="font-extrabold text-center text-custom-primary">
        {NotFoundText}
      </h6>
    </div>
  );
};

export default NotFound;
