import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { updateProfile } from "../../api";

export default function UserInfo() {
  const { user } = useAuthContext();
  const [avatar, setAvatar] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [bio, setBio] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [show_account_suggestions, setShow_account_suggestions] = useState<
    boolean | undefined
  >(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  useEffect(() => {
    if (user && typeof user !== "string") {
      setName(user.name);
      setUsername(user.username);
      setBio(user.bio);
      setGender(user.gender);
      setShow_account_suggestions(user.show_account_suggestions);
      setAvatar(user.avatar);
    }
  }, [user]);

  useEffect(() => {
    if (user && typeof user !== "string") {
      if (
        name === user.name &&
        username === user.username &&
        bio === user.bio &&
        gender === user.gender &&
        show_account_suggestions === user.show_account_suggestions &&
        avatar === user.avatar
      ) {
        setDisabledBtn(true);
      } else setDisabledBtn(false);
    }
  }, [name, username, bio, gender, show_account_suggestions, avatar]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await updateProfile({
      file,
      username,
      name,
      gender,
      show_account_suggestions: show_account_suggestions?.toString(),
      bio,
    });
    if (data.status === 200) {
      const { avatar, username, name, gender, show_account_suggestions, bio } =
        data.metadata.user;
      setAvatar(avatar);
      setUsername(username);
      setName(name);
      setGender(gender);
      setShow_account_suggestions(show_account_suggestions);
      setBio(bio);
      setDisabledBtn(true);
    }
  }

  return (
    <form className="mt-6">
      <div className="relative w-[130px] mb-5">
        <img
          src={avatar}
          alt="Profile"
          className="w-[130px] h-[130px] rounded-full object-cover"
        ></img>
        <input
          type="file"
          id="file_avatar"
          className="sr-only mt-4 mb-6"
          accept="image/png, image/gif, image/jpeg"
          onChange={async function (e) {
            if (!e.target.files) return;
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
              if (!e.target) return;
              setAvatar(e.target.result as string);
            };
            reader.readAsDataURL(file);
            setFile(file);
          }}
        />
        <label htmlFor="file_avatar">
          <div className="flex justify-center w-full h-10 bg-[#0099e6] text-white rounded font-medium transition duration-200 text-[13px] px-2 py-1 mt-3 outline-none">
            <div className="my-auto">Change photo</div>
          </div>
        </label>
      </div>
      <label className="font-bold text-[17px]">Username</label>
      <input
        type="text"
        placeholder="Username"
        className="w-full bg-[rgb(239,239,239)] px-3 py-3 rounded-md mt-3 mb-6 outline-none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="font-bold text-[17px]">Name</label>
      <input
        type="text"
        placeholder="Name"
        className="w-full bg-[rgb(239,239,239)] px-3 py-3 rounded-md mt-3 mb-6 outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="font-bold text-[17px]">Website</label>
      <input
        type="text"
        placeholder="Website"
        className="w-full bg-[rgb(239,239,239)] px-3 py-3 rounded-md mt-3 mb-2 outline-none"
      />
      <div className="text-[12px] mb-6">
        Editing your links is only available on mobile. Visit the Instagram app
        and edit your profile to change the websites in your bio.
      </div>
      <label className="font-bold text-[17px]">Bio</label>
      <div className="relative">
        <textarea
          placeholder="Bio"
          maxLength={150}
          className="w-full h-[150px] bg-[rgb(239,239,239)] px-3 py-3 rounded-md mt-3 mb-2 outline-none "
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <div className="absolute right-4 bottom-6 text-[14px]">
          {bio?.length ? bio.length : 0} / 150
        </div>
      </div>
      <label className="font-bold text-[17px]">Gender</label>
      <div className="relative">
        <div
          id="dropdown"
          className="dropdown dropdown-example  flex flex-col w-full mt-3"
        >
          <button
            id="dropdown-example"
            type="button"
            className="dropdown-toggle py-3 px-4 flex gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none w-full outline-none mb-6"
            onClick={function () {
              const dropdownMenu = document.querySelector(".dropdown-menu");
              if (dropdownMenu) dropdownMenu.classList.toggle("hidden");
            }}
          >
            <div className="w-[95%] text-left">{gender}</div>
            <svg
              className="hs-dropdown-open:rotate-180 size-4 text-gray-600 my-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>

          <div
            className="dropdown-menu absolute right-0 -bottom-[110px] transition-[opacity,margin] duration w-[90%] hidden z-10 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2"
            aria-labelledby="dropdown-example"
          >
            <button
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 w-full"
              onClick={function (e) {
                e.preventDefault();
                setGender("Female");
              }}
            >
              Female
            </button>
            <button
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 w-full"
              onClick={function (e) {
                e.preventDefault();
                setGender("Male");
              }}
            >
              Male
            </button>
            <button
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 w-full"
              onClick={function (e) {
                e.preventDefault();
                setGender("Prefer not to say");
              }}
            >
              Prefer not to say
            </button>
          </div>
        </div>
      </div>
      <label className="font-bold text-[17px]">
        Show account suggestions on profiles
      </label>
      <div className="flex border-[1px] border-gray-200 py-5 px-6 mt-3 mb-6 rounded-lg">
        <div>
          <div className="text-[16px]">
            Show account suggestions on profiles
          </div>
          <div className="text-[13px]">
            Choose whether people can see similar account suggestions on your
            profile, and whether your account can be suggested on other
            profiles.
          </div>
        </div>
        <div className="my-auto">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={show_account_suggestions}
              className="hidden peer"
            />
            <div
              className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-black rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"
              onClick={function () {
                setShow_account_suggestions(!show_account_suggestions);
              }}
            ></div>
          </label>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={disabledBtn}
        type="submit"
        className="w-full h-12 bg-[#0099e6] text-white rounded font-medium transition duration-200 text-[14px] px-3 py-3 disabled:opacity-40 outline-none"
      >
        {"Submit"}
      </button>
    </form>
  );
}
