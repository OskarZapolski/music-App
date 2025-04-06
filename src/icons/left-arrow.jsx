export default function LeftArrow({ scrollRef }) {
  return (
    <svg
      fill="white"
      height="40px"
      width="40px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="rotate-180 bg-black rounded-full p-2"
      onClick={() => {
        scrollRef.current.scrollBy({
          left: -300,
          behavior: "smooth",
        });
      }}
    >
      <g>
        <g>
          <path
            d="M388.418,240.915L153.752,6.248c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17L343.163,256
			L123.582,475.582c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0l234.667-234.667
			C396.749,262.754,396.749,249.246,388.418,240.915z"
          />
        </g>
      </g>
    </svg>
  );
}
