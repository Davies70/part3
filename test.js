import React, {useState, useEffect} from "react";

export const ColorCodes = () => {

  const [colors, setColors] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  useEffect(() => {
     const colorArray = generateRandomColors();
    setColors(colorArray);
  }, [resetGame])

  const generateRandomColors = () => {
    const hexChars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

    let randomColors = []
    for (let i = 0 ; i < 3; i++)
      {
        let randomColor = '#';
        for (let hex = 0; hex < 6; hex++) {
          randomColor = randomColor + hexChars[Math.floor(Math.random() * hexChars.length)];
        };
        randomColors.push(randomColor);
      }
    return randomColors;
  };



  const displayColor = colors[Math.floor(Math.random() * 3)];


  const pickColor = (event) => {
    const selectedColor = event.target.className;
    selectedColor === displayColor ? setCorrect(true) : null;
    setPlayAgain(true)
  };

  const reset = () => {
    setPlayAgain(!playAgain);
    setCorrect(!correct);
    setResetGame(!resetGame)
  };

  let test = correct ? 'correct-color' : 'incorrect-color';
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Color Codes</h1>
      {/* Randomly generate the HEX below. */}
      <h2>{displayColor}</h2>
      <h2>What color is this?</h2>
      <div style={{display: 'flex', width: 400, height: 100, border: 'solid',}} data-testid="color-container">
        <div

          className={colors[0]}
          style={{backgroundColor: colors[0], flexGrow: 1}}
          onClick={pickColor}>
          1
        </div>
        <div
        className={colors[1]}
        style={{backgroundColor: colors[1], flexGrow: 1}}
        onClick={pickColor}>
          2
        </div>
        <div
          className={colors[2]}
          style={{backgroundColor: colors[2], flexGrow: 1}}
          onClick={pickColor}>
          3
        </div>
        <div>
        {
          playAgain ? (
            <div>
            <div data-testid={test}><h2>{ correct ? 'Correct!' : 'Incorrect!'}</h2></div>

            </div>
          )
            : null
        }
      </div>
      </div>

      {/*
        <div data-testid="color-container">
          <div data-testid="incorrect-color"></div>
          <div data-testid="correct-color"></div>
        </div>
      */}
    </div>
  );
};

