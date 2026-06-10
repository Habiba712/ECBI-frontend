export default function SectionHeaders({title,description}) {
    return (
        <div className="mt-4 flex flex-col items-center justify-center w-full gap-3 ">
            <h3  className="text-white font-bold text-bold font-sans text-4xl ">{title}</h3>
            <h4 className="text-sm  text-white text-center leading-4  semibold w-80">{description}</h4>
        </div>

    )
}