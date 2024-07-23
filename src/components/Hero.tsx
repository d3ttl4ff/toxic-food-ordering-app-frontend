import hero from "../assets/main images/hero6.jpg";

export default function Hero() {
  return (
    <div>
      <img
        src={hero}
        alt="hero image"
        className="w-full max-h-[600px] object-cover"
      />
    </div>
  );
}
