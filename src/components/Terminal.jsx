import { useState } from "react";

export default function Terminal() {
  let [i, setI] = useState(0);

  return (
    <>
      <div className="size-full overflow-y-scroll select-none text-sm sm:text-base">
        <div className="size-full flex flex-col">
          I am a test {i}
          <button onClick={() => setI(i + 1)}>click here</button>
        </div>
      </div>
    </>
  );
}
