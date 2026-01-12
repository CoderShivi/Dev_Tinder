const UserCard = () => {
  const dummyUser = {
    firstName: "Shivani",
    lastName: "Dubey",
    age: 23,
    gender: "female",
    about: "Frontend Developer | React | Tailwind | Loves clean UI and animations",
    photoUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377500",
  };

  return (
    <div className="w-[360px] h-[520px] rounded-3xl overflow-hidden shadow-2xl bg-white relative">
      
      {/* Profile Image */}
      <img
        src={dummyUser.photoUrl}
        alt="profile"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* User Info */}
      <div className="absolute bottom-0 p-5 text-white">
        <h2 className="text-2xl font-bold">
          {dummyUser.firstName} {dummyUser.lastName}
          <span className="ml-2 text-lg font-normal">
            {dummyUser.age}
          </span>
        </h2>

        <p className="text-sm capitalize opacity-90">
          {dummyUser.gender}
        </p>

        <p className="text-sm mt-2 line-clamp-3">
          {dummyUser.about}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-6">
        <button className="w-14 h-14 rounded-full bg-white shadow-lg text-red-500 text-xl hover:scale-110 transition">
          ❌
        </button>
        <button className="w-14 h-14 rounded-full bg-white shadow-lg text-green-500 text-xl hover:scale-110 transition">
          ❤️
        </button>
      </div>
    </div>
  );
};

export default UserCard;
