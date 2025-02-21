
const CommonHeroSection = ({title,subtext}) => {
    return (
        <section>
            <div className="bg-[url('https://i.ibb.co.com/WHH3bVW/Study-Only.png')] bg-cover bg-center bg-no-repeat relative w-full pb-36 pt-44 mx-auto">
                <div className="container h-[100%] flex flex-col justify-center gap-2 text-white">
                    <h1 className="">{title}</h1>
                    <h6 className="md:w-[80%]">{subtext}</h6>
                </div>
            </div>
      </section>
    );
};

export default CommonHeroSection;