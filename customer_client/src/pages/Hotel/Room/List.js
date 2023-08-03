// UI lib
import { useSelector } from "react-redux";
// UI custom
// logic lib
import Item from "./Item";
// logic custom

//#region CSS
//#endregion

const RoomTypeList = ({
  comboList,
  setOpenViewer,
  setDataViewer,
  selectedRooms,
  setSelectedRooms,
  selectedComboList,
  setSelectedComboList,
}) => {
  const roomTypeList = useSelector((state) => state.room_type);
  return (
    <>
      {roomTypeList.map((roomType, index) => (
        <Item
          key={index}
          comboList={comboList}
          roomType={roomType}
          setDataViewer={setDataViewer}
          setOpenViewer={setOpenViewer}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          selectedComboList={selectedComboList}
          setSelectedComboList={setSelectedComboList}
        />
      ))}
    </>
  );
};

export default RoomTypeList;
