import { MdArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center pt-10 pb-3 border-8 mb-10">
      <h1 className="text-4xl font-bold pb-6 underline">{event.title}</h1>
      <img
        src={event.image}
        className="min-w-[90%] max-h-[60vh] object-contain mb-2"
        alt="Event"
      />
      <div onClick={() => navigate(`/event-details/${event.slug}`)}>
        <button className="flex items-center px-6 py-2 mt-4 bg-purple-500 rounded-full text-xl font-semibold">
          View Details <MdArrowRight size={30} />
        </button>
      </div>
    </div>
  );
}
