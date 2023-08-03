// UI lib
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
// UI custom

// logic lib
import Item from "./Item";
// logic custom

//#region CSS

//#endregion

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

const PROPERTIES = ["", "min_price", "-min_price", "-score"];

const BookingList = ({ setOpenImageViewer, setImages, sortValue }) => {
  const hotels = useSelector((state) => {
    return state.hotelList.sort(dynamicSort(PROPERTIES[sortValue]));
  });
  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      {hotels.map((hotel, index) => (
        <Item
          key={index}
          setImages={setImages}
          setOpenImageViewer={setOpenImageViewer}
          hotel={hotel}
        />
      ))}
    </Container>
  );
};

export default BookingList;
