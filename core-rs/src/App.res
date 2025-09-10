type props2 = {x: string}

module X = {
  @react.component
  let com = (~p: props2) => {
    <div> {React.string(p.x)} </div>
  }
}

@react.component
let make: unit => Jsx.element = () => {
  let (count, setCount) = React.useState(() => 0)

  <div className="max-w-200">
    <div className="flex justify-evenly items-center" />
    <h1 className="text-6xl m-16 font-semibold text-center"> {"Vite + ReScript"->React.string} </h1>
    <button onClick={_ => setCount(count => count + 1)}>
      {React.string(`count is ${count->Int.toString}`)}
    </button>
    <p className="my-6 text-center">
      {React.string("Edit ")}
      <code className="bg-stone-100 font-mono rounded"> {React.string("src/App.res")} </code>
      {React.string(" and save to test Fast Refresh.")}
    </p>
    <p className="text-center font-thin text-stone-400">
      {React.string("Learn more about ")}
      <a
        href="https://rescript-lang.org/" target="_blank" className="text-blue-500 hover:underline">
        {React.string("ReScript")}
        {React.string(".")}
      </a>
    </p>
  </div>
}
