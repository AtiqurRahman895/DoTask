import TitleSection from "../CommonComponent/TitleSection";
import AddTaskModal from "./AddTaskModal";

const Home = () => {
  return (
    <main className="space-y-14 mt-12">
      <TitleSection title={"Home"} />
      <section className="">
          <div className="container space-y-12">
            <div className="sectionHeaderWidth text-center">
              <AddTaskModal />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {
                // contactInfoList?.map((contactInfo,index)=>(
                //     <Link key={index} to={contactInfo.link} target={index!==0?"_blank":""}
                //         className="relative bg-custom-metalic-gray text-black dark:text-white rounded-md px-4 py-10 flex items-center gap-4 overflow-hidden"
                //     >
                        
                //         <ReactSVG src={contactInfo.svg} className='w-16 text-custom-primary mb-2'/>
                //         <div className="">
                //             <h4>{contactInfo.text}</h4>
                //             <p>{contactInfo.info}</p>
                //         </div>
                //         <ReactSVG src={contactInfo.svg} className='absolute -right-0.5 -bottom-0.5 opacity-20 w-12'/>

                //     </Link>
                // ))
              }
            </div>
          </div>
      </section>


    </main>
  );
};

export default Home;
