const Room = ({ room, selected, onClick }) => {
  const full = room.members.length >= room.maxMembers;
  return (
    <div className="w-full flex flex-col items-center justify-center h-48 ">
      <li>
        <button
          className={"room" + (selected ? " selected" : "")}
          onClick={onClick}
        >
          <span className="room-top">
            <strong>{room.name}</strong>
            <span className={"count" + (full ? " full" : "")}>
              {room.members.length}/{room.maxMembers}
            </span>
          </span>
          <span className="desc">{room.description}</span>
          <span className="tags">
            <span className="tag">{room.language}</span>
            <span className="tag">{room.level}</span>
          </span>
        </button>
      </li>
    </div>
  );
};

export default Room;
