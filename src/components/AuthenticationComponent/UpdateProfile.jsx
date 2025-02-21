import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";
import useHostImage from "../../Hooks/useHostImage";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName);
  // const [photoURL, setPhotoURL]=useState(user?.photoURL)

  const [image, setImage] = useState(user?.photoURL);

  const hostImage = useHostImage();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    hostImage(file, setImage);
  };

  const navigate = useNavigate();

  // const handleFormInputChanges=(e)=>{
  //     if(e.target.name==="name"){
  //         setName(e.target.value)
  //     }

  // }
  const UpdateProfileOnSubmit = (e) => {
    e.preventDefault();

    updateUserProfile(name, image)
      .then(() => {
        e.target.reset();
        navigate("/");
        toast.success("User Profile successfully updated!");
      })
      .catch((error) => {
        toast.error(error.message ? error.message : error.code);
      });
  };
  return (
    <section className="mt-16">
      <div className="container hero flex items-center justify-center">
        <div className="fromWrapper max-w-sm">
          <h1 className="text-5xl font-bold">Update now!</h1>
          <form onSubmit={UpdateProfileOnSubmit} className="card-body p-0">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="">Name</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input input-ghost input-bordered"
                minLength={3}
                value={name}
                readOnly
                required
              />
            </div>

            {/* <div className="form-control">
                            <label htmlFor='photoURL' className="label">
                                <span className="">Photo url</span>
                            </label>
                            <input onChange={handleFormInputChanges} type='text' name="photoURL" id="photoURL" className="input input-ghost input-bordered" value={photoURL}/>
                        </div> */}

            <div className="form-control flex flex-col items-center mt-3">
              <label
                htmlFor="image"
                className="label relative flex flex-col text-center w-fit"
              >
                <div className="">
                  {image ? (
                    <div className="bg-white max-w-12 xs:max-w-20 aspect-square rounded-full overflow-hidden">
                      <img src={image ? image : ""} alt="" className="" />
                    </div>
                  ) : (
                    <FaRegUserCircle className={`text-5xl xs:text-7xl`} />
                  )}

                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input absolute opacity-0 scale-0"
                  />
                </div>
                <span className="">
                  {image ? "1 Image File Chosen" : "Choose your Photo"}
                </span>
              </label>
              {/* <input type='text' name="photoURL" id="photoURL" className="input input-ghost input-bordered" /> */}
            </div>

            <div className="form-control mt-6">
              <button className="formSubmitBtn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
