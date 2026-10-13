const Room = ({ outRoom, selected, onClick }) => {
  console.log(outRoom);
  const room = {
    name: outRoom?.room_name,
    description: outRoom?.room_description,
    language: outRoom?.room_langue,
    level: outRoom?.room_level,
    maxMembers: outRoom?.room_max_members,
    members: outRoom?.inside_room_members.length,
  };
  console.log(room);
  const full = room.members >= room.maxMembers;
  return (
    <li>
      <button
        className={"room" + (selected ? " selected" : "")}
        onClick={onClick}
      >
        <span className="room-top">
          <strong>{room.name}</strong>
          <span className={"count" + (full ? " full" : "")}>
            {room.members}/{room.maxMembers}
          </span>
        </span>
        <span className="desc">{room.description}</span>
        <span className="tags">
          <span className="tag">{room.language}</span>
          <span className="tag">{room.level}</span>
        </span>
      </button>
    </li>
  );
};

export default Room;
