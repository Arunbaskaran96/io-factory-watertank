function waterTank(arr) {
  let forwardCase = [];
  let reverseCase = [];
  let finalCase = [];
  let maxWaterHold = 0;
  let prevValue = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      forwardCase[i] = prevValue;
    } else {
      forwardCase[i] = "wall";
      prevValue = arr[i];
    }
  }
  prevValue = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == 0) {
      reverseCase[i] = prevValue;
    } else {
      reverseCase[i] = "wall";
      prevValue = arr[i];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      finalCase[i] = {
        type: "water",
        size: forwardCase[i] > reverseCase[i] ? reverseCase[i] : forwardCase[i],
      };
      maxWaterHold += parseInt(finalCase[i].size);
    } else {
      finalCase[i] = {
        type: "wall",
        size: arr[i],
      };
    }
  }
  return { result: finalCase, maxWaterHold };
}

function handleSubmit() {
  //getting input form input element
  const inputElem = document.getElementById("input");
  const inputVal = inputElem.value.split(",").map(Number);
  const findNegativeValue = inputVal.some((val) => val < 0);

  if (!inputElem.value) {
    return alert("Please Enter The Value Before Submitting");
  }

  //checking whether value has any negative number
  if (findNegativeValue) {
    alert(
      "All the values in the input box should be greater than or equal to zero"
    );
  } else {
    //Deleting the previous result if it is present
    const deletePrevProcess = document.getElementById("resultContainer");
    if (deletePrevProcess.hasChildNodes()) {
      deletePrevProcess.removeChild(deletePrevProcess.children[0]);
    }

    const { result, maxWaterHold } = waterTank(inputVal);

    const answercontainer = document.getElementById("resultContainer");
    const answerElem = document.createElement("div");
    answerElem.setAttribute("id", "answer");

    //Display the max amount of water hold
    const TotalWater = document.createElement("h2");
    TotalWater.innerText = `This input can hold maximum of ${maxWaterHold} units`;
    TotalWater.style.textAlign = "center";
    TotalWater.style.marginBottom = "10px";
    answerElem.appendChild(TotalWater);
    answercontainer.appendChild(answerElem);

    //initialize svg for bricks with water
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "400");
    svg.setAttribute("class", "chart");
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );

    let xaxis = 0;

    const bricks = document.createElement("div");
    bricks.setAttribute("id", "brickwithwater");
    const bricksHeading = document.createElement("h2");
    bricksHeading.innerText = "This Graph Shows bricks and water";
    bricksHeading.style.textAlign = "center";

    for (let i = 0; i < result.length; i++) {
      var gElem = document.createElementNS("http://www.w3.org/2000/svg", "g");
      gElem.setAttribute("class", "bar");
      gElem.setAttribute("transform", `translate(${xaxis},0)`);
      var rectElem = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rectElem.setAttribute("height", result[i].size * 50);
      rectElem.setAttribute("width", "25");
      gElem.append(rectElem);
      svg.append(gElem);
      xaxis = xaxis + 30;
      if (result[i].type === "water") {
        gElem.classList.add("barwater");
      }
    }
    bricks.appendChild(svg);
    answerElem.appendChild(bricks);
    answerElem.appendChild(bricksHeading);
    answercontainer.appendChild(answerElem);

    //careting svg for only water
    const onlywater = document.createElement("div");
    onlywater.setAttribute("id", "onlywater");
    const onlyWaterHeading = document.createElement("h2");
    onlyWaterHeading.innerText = "This Graph Shows only water";
    onlyWaterHeading.style.textAlign = "center";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "300");
    svg.setAttribute("height", "500");
    svg.setAttribute("class", "chart");
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );

    xaxis = 0;
    for (let i = 0; i < result.length; i++) {
      var gElem = document.createElementNS("http://www.w3.org/2000/svg", "g");
      gElem.setAttribute("class", "bar");
      gElem.setAttribute("transform", `translate(${xaxis},0)`);
      var rectElem = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rectElem.setAttribute("height", result[i].size * 50);
      rectElem.setAttribute("width", "25");
      gElem.append(rectElem);
      svg.append(gElem);
      xaxis = xaxis + 30;
      if (result[i].type === "wall") {
        rectElem.setAttribute("height", 0);
      } else {
        gElem.classList.add("barwater");
      }
    }
    onlywater.appendChild(svg);
    answerElem.appendChild(onlywater);
    answerElem.appendChild(onlyWaterHeading);
    answercontainer.appendChild(answerElem);
  }
}
