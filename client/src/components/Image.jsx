export default function Image({ src, ...rest }) {
  src = src && src.includes("https://") ? src : src.replace(/\\/g, "/");
  return <img {...rest} src={src} alt="" />;
}
