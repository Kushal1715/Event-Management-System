import {
  Alert,
  Button,
  Datepicker,
  FileInput,
  Select,
  TextInput,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "../components/DatePicker";
import { useSelector } from "react-redux";

export default function UpdateEvent() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { eventId } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchEvent = async () => {
        const res = await fetch(`/api/event/getevents?eventId=${eventId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.events[0]);
        }
      };

      fetchEvent();
    } catch (error) {
      console.log(error.message);
    }
  }, [eventId]);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/event/updateevent/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/event/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update a event
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="workshops">Workshops</option>
            <option value="concerts">Concerts</option>
            <option value="exhibitions">Exhibitions</option>
            <option value="conferences">Conferences</option>
            <option value="festivals">Festivals</option>
            <option value="others">Others</option>
          </Select>
        </div>
        <TextInput
          type="text"
          placeholder="Venue"
          required
          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          value={formData.venue}
        />
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            // required
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Describe your event..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content}
        />
        <div className="flex flex-col gap-4 sm:flex-row justify-between sm:items-center">
          <h1>Event Date and Time:</h1>
          <TextInput
            type="date"
            required
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="flex-1"
            min={new Date().toISOString().split("T")[0]}
            value={
              formData.date
                ? new Date(formData.date).toISOString().split("T")[0]
                : ""
            }
          />
          <TextInput
            type="time"
            placeholder="Event Time"
            required
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            value={formData.time}
          />
          <TextInput
            type="text"
            placeholder="Event Duration"
            required
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            value={formData.duration}
          />
        </div>

        <TextInput
          type="text"
          placeholder="Organizer Name"
          required
          onChange={(e) =>
            setFormData({ ...formData, organizerName: e.target.value })
          }
          value={formData.organizerName}
        />
        <TextInput
          type="tel"
          placeholder="Contact Info"
          required
          onChange={(e) =>
            setFormData({ ...formData, contactInfo: e.target.value })
          }
          value={formData.contactInfo}
        />
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="number"
            placeholder="Ticket Price"
            required
            onChange={(e) =>
              setFormData({ ...formData, ticketPrice: e.target.value })
            }
            value={formData.ticketPrice}
          />
          <TextInput
            type="number"
            placeholder="Number of Available Tickets"
            required
            onChange={(e) =>
              setFormData({ ...formData, availableTickets: e.target.value })
            }
            className="flex-1"
            value={formData.availableTickets}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between sm:items-center">
          <h1>Registration Date and Time:</h1>
          <TextInput
            type="date"
            placeholder="Registration Deadline"
            required
            onChange={(e) =>
              setFormData({ ...formData, registrationDate: e.target.value })
            }
            min={new Date().toISOString().split("T")[0]}
            className="flex-1"
            value={
              formData.registrationDate
                ? new Date(formData.registrationDate)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
          />

          <TextInput
            type="time"
            required
            onChange={(e) =>
              setFormData({ ...formData, registrationTime: e.target.value })
            }
            value={formData.registrationTime}
          />
        </div>

        <Button type="submit" gradientDuoTone="purpleToPink">
          Update event
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
