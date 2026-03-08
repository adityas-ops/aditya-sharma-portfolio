// CatHero - Interactive cat component using iframe to load original Yakudoo demo

export default function CatHeroModel() {
  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        position: "relative",
      }}
    >
      <iframe
        src="/cat.html"
        title="Interactive Cat"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        loading="eager"
      />
    </div>
  );
}
