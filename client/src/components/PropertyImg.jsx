import Image from "./Image.jsx";

export default function PropertyImg({ property, index = 0, className = null }) {
  if (!property.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover w-full";
  }
  return <Image className={className} src={property.photos[index]} alt="" />;
}
