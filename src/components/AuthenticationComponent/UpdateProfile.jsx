import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";
import useHostImage from "../../Hooks/useHostImage";
import { useNavigate } from "react-router";
import TitleSection from "../CommonComponent/TitleSection";
import useSecureAxios from "../../Hooks/useSecureAxios";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName);
  const [image, setImage] = useState(user?.photoURL);
  const secureAxios= useSecureAxios()
  const navigate = useNavigate();

  const hostImage = useHostImage();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    hostImage(file, setImage);
  };


  const UpdateProfileOnSubmit = async (e) => {
    e.preventDefault();
    if(!image){
      toast.warning("You must provide your profile image. Only JPG, PNG, GIF image files are allowed, and the maximum file size is 10MB. Please select an appropriate image file to proceed!")
      return
    }
    
    try {
      await updateUserProfile(name, image)
      const credentials= {name, image}
      await secureAxios.put(`/user/${user?.email}`, credentials);
      toast.success("User Profile successfully updated!");
      navigate("/");
    } catch (error) {
      toast.error(error.message ? error.message : error.code);
      console.error(error)
    }
    
  };
  return (
    <main className="space-y-14 pt-28 pb-12">
      <TitleSection title="Update Profile" />
      <section className="">
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
                  onChange={e=>setName(e.target.value)}
                  className="input input-ghost input-bordered"
                  minLength={3}
                  value={name}
                  // readOnly
                  required
                />
              </div>

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
              </div>

              <div className="form-control mt-6">
                <button className="formSubmitBtn">Update</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UpdateProfile;
