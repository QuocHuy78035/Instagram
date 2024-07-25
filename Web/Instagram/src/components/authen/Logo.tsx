export default function Logo(body: { className: string }) {
  return (
    <div className={body.className}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
        width={"160px"}
        height={"50px"}
        className="mx-auto"
      ></img>
    </div>
  );
}
