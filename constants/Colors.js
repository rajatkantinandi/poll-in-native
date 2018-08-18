const ColorClass = mode => {
  this.LightMode = {
    signInbg: "#ddd",
    primaryText: "#111",
    secondaryTxt: "#555",
    impTxt: "#422",
    btnText: "#ccc",
    blueBtn: "#229",
    infoBtn: "#75c",
    maroonBtn: "#322",
    greenBtn: "#292",
    navyInput: "#eef",
    bloodInput: "#eff",
    newInput: "#efe",
    lightbg: "#eee",
    darkbg: "#bbb",
    optionbg: "#bbc",
    optionbgChecked: "#afa",
    optiontxt: "#000",
    optiontxtChecked: "#333",
    voteBtnbg: "#483",
    donebg: "#445",
    resultBtnbg: "#348",
    shareBtnbg: "#388",
    usericon: "#717",
    titleBarbg: "#e6e6fa",
    headerTintColor: "#333",
    demoTabbg: "#717",
    demoTabTint: "#ddf",
    iconColor: "#222",
    iconColor2: "#ccc",
    fancyBorder: "#414",
    loadingTxt: "#040"
  };
  this.DarkMode = {
    signInbg: "#120B16",
    primaryText: "#fff",
    secondaryTxt: "#999",
    impTxt: "#e99",
    btnText: "#ccc",
    blueBtn: "#44a",
    maroonBtn: "#622",
    greenBtn: "#3a3",
    infoBtn: "#75c",
    navyInput: "#235",
    bloodInput: "#410",
    newInput: "#152",
    lightbg: "#555",
    darkbg: "#113",
    optionbg: "#353528",
    optionbgChecked: "#8f8",
    optiontxt: "#eee",
    optiontxtChecked: "#333",
    voteBtnbg: "#151",
    donebg: "#235",
    resultBtnbg: "#126",
    shareBtnbg: "#266",
    usericon: "#faf",
    titleBarbg: "#e6e6fa",
    headerTintColor: "#333",
    demoTabbg: "#303",
    demoTabTint: "#ddf",
    iconColor: "#ddd",
    iconColor2: "#ddd",
    fancyBorder: "#505",
    loadingTxt: "#3c3"
  };
  this.mode = mode;
};
ColorClass.prototype.getColor = () => {
  if (this.mode) return this.mode == "light" ? this.LightMode : this.DarkMode;
  else return this.LightMode;
};
ColorClass.prototype.getColorFromMode = mode => {
  return mode == "light" ? this.LightMode : this.DarkMode;
};
ColorClass.prototype.setColor = mode => {
  this.mode = mode;
};
export const ColorMode = new ColorClass("light");
