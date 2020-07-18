// Food Controller
var FoodController = (function () {
  var Food = function (id, name, calories, fats, carbs, protein) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.fats = fats;
    this.carbs = carbs;
    this.protein = protein;
  };

  // main data structure
  var data = {
    user: "Aaron Asuncion",
    mainTotals: {
      calories: 0,
      fats: 0,
      carbs: 0,
      protein: 0,
    },
    currentTotals: {
      calories: 0,
      fats: 0,
      carbs: 0,
      protein: 0,
      totalPercentages: {
        caloriesBar: 0,
        fatsBar: 0,
        carbsBar: 0,
        proteinBar: 0,
      },
    },
    foodItems: [],
    statistics: {
      highestCals: { name: "", value: 0 },
      highestFats: { name: "", value: 0 },
      highestCarbs: { name: "", value: 0 },
      highestProtein: { name: "", value: 0 },
    },
    status: "",
  };

  var calcTotalCals = function (fats, carbs, protein) {
    totalCals = fats * 9 + carbs * 4 + protein * 4;
    return totalCals;
  };

  return {
    setUserMacros: function (obj) {
      // 1. calculate the total calories first
      data.mainTotals.calories = obj.cals;
      data.mainTotals.fats = obj.fats;
      data.mainTotals.carbs = obj.carbs;
      data.mainTotals.protein = obj.protein;
    },
    getTotalMacros: function () {
      return {
        calories: data.mainTotals.calories,
        fats: data.mainTotals.fats,
        carbs: data.mainTotals.carbs,
        protein: data.mainTotals.protein,
      };
    },
    calculateCalories: function (fats, carbs, protein) {
      var totalCals = calcTotalCals(fats, carbs, protein);
      return totalCals;
    },
    calculateCurrentTotals: function () {
      var curTotals, foodArr;
      curTotals = data.currentTotals;
      foodArr = data.foodItems;
      if (foodArr.length !== 0) {
        // reset the current totals before recalculating
        curTotals.calories = 0;
        curTotals.fats = 0;
        curTotals.carbs = 0;
        curTotals.protein = 0;
        // recalculate current totals by looping through the food items
        foodArr.forEach(function (cur) {
          curTotals.calories += cur.calories;
          curTotals.fats += cur.fats;
          curTotals.carbs += cur.carbs;
          curTotals.protein += cur.protein;
        });
      } else {
        curTotals.calories = 0;
        curTotals.fats = 0;
        curTotals.carbs = 0;
        curTotals.protein = 0;
      }
    },
    addFoodItem: function (newItem) {
      var foodItems, ID, newFood;
      foodItems = data.foodItems;

      // set the id to the previous food item's id + 1, else if foodItems length is less than 1 aka 0, set id to 1
      ID = foodItems.length >= 1 ? foodItems[foodItems.length - 1].id + 1 : 1;

      // declare new food item
      newFood = new Food(
        ID,
        newItem.name,
        newItem.cals,
        newItem.fats,
        newItem.carbs,
        newItem.protein
      );
      // add the new food item to the data structure
      foodItems.push(newFood);

      return newFood;
    },
    deleteFoodItem: function (id) {
      var foodItems, index;
      foodItems = data.foodItems;
      // loop through food items to find the item with the matching id
      foodItems.forEach(function (cur) {
        if (cur.id === id) {
          // set the index variable to the food item that has the same id as the id that was passed
          index = foodItems.indexOf(cur);
        }
      });
      // remove the item from the data.foodItems array
      foodItems.splice(index, 1);
    },
    getFoodItems: function () {
      return data.foodItems;
    },
    getCurrentTotals: function () {
      return data.currentTotals;
    },
    calculateTotalPercentages: function () {
      var curTotals, mainMacros, percentages, foodItems;
      curTotals = data.currentTotals;
      mainMacros = data.mainTotals;
      percentages = data.currentTotals.totalPercentages;
      foodItems = data.foodItems;
      if (data.foodItems.length !== 0) {
        //calculate the percentages
        percentages.caloriesBar = Math.round(
          (curTotals.calories / mainMacros.calories) * 100
        );
        percentages.fatsBar = Math.round(
          (curTotals.fats / mainMacros.fats) * 100
        );
        percentages.carbsBar = Math.round(
          (curTotals.carbs / mainMacros.carbs) * 100
        );
        percentages.proteinBar = Math.round(
          (curTotals.protein / mainMacros.protein) * 100
        );
      } else {
        data.currentTotals.totalPercentages = {
          caloriesBar: 0,
          fatsBar: 0,
          carbsBar: 0,
          proteinBar: 0,
        };
      }
    },
    calculateItemPercentages: function (obj) {
      var fatsPercentage, carbsPercentage, proteinPercentage;
      fatsPercentage = Math.round(((obj.fats * 9) / obj.calories) * 100);
      carbsPercentage = Math.round(((obj.carbs * 4) / obj.calories) * 100);
      proteinPercentage = Math.round(((obj.protein * 4) / obj.calories) * 100);
      return {
        fatsPercent: fatsPercentage,
        carbsPercent: carbsPercentage,
        proteinPercent: proteinPercentage,
      };
    },
    calculateStatistics: function () {
      var foodItems, stats, allStatItems;
      foodItems = data.foodItems;
      stats = data.statistics;
      for (var i in stats) {
        stats[i].name = "N/A";
        stats[i].value = 0;
      }
      // loop through the food items, if the current value is greater than the current statistic, that food item will be set for that category
      if (foodItems.length !== 0) {
        foodItems.forEach(function (cur) {
          if (cur.calories > stats.highestCals.value) {
            stats.highestCals.name = cur.name;
            stats.highestCals.value = cur.calories;
          }
          if (cur.fats > stats.highestFats.value) {
            stats.highestFats.name = cur.name;
            stats.highestFats.value = cur.fats;
          }
          if (cur.carbs > stats.highestCarbs.value) {
            stats.highestCarbs.name = cur.name;
            stats.highestCarbs.value = cur.carbs;
          }
          if (cur.protein > stats.highestProtein.value) {
            stats.highestProtein.name = cur.name;
            stats.highestProtein.value = cur.protein;
          }
        });
      }
    },
    getAnalytics: function () {
      return data.statistics;
    },
    getCurrentTotals: function () {
      return data.currentTotals;
    },
  };
})();
// UIController
var UIController = (function () {
  // DOMstring elements
  var DOMstrings = {
    // SECTIONS
    bodyContainer: "body",
    mainContentContainer: ".main-content",
    dashboardContainer: ".dashboard",
    welcomeSection: ".welcome",
    welcomeContainer: ".welcome__container",
    foodLogContainer: ".food__log-wrapper",
    itemContainer: ".item-container",
    // FORMS
    addFoodForm: ".form__add",
    formTotalsContainer: ".form__totals",
    // WELCOME FORM MESSAGE
    welcomeHeader: ".welcome__header",
    welcomeText: ".welcome__text",
    // SAVE TOTAL MACROS INPUTS
    inputTotalFats: ".form__input--fats",
    inputTotalCarbs: ".form__input--carbs",
    inputTotalProtein: ".form__input--protein",
    inputTotalCals: ".form__input--cals",
    // OVERVIEW SECTION VALUES
    curTotalCals: ".overview__current--cals",
    calsProgressBar: ".overview__percent--cals",
    calsPercentVal: ".overview__percent-val--cals",
    curTotalFats: ".overview__current--fats",
    fatsProgressBar: ".overview__percent--fats",
    fatsPercentVal: ".overview__percent-val--fats",
    curTotalCarbs: ".overview__current--carbs",
    carbsProgressBar: ".overview__percent--carbs",
    carbsPercentVal: ".overview__percent-val--carbs",
    curTotalProtein: ".overview__current--protein",
    proteinProgressBar: ".overview__percent--protein",
    proteinPercentVal: ".overview__percent-val--protein",
    // ANALYTICS
    analyticsMostCalsVal: ".analytics__value--cals",
    analyticsMostFatsVal: ".analytics__value--fats",
    analyticsMostCarbsVal: ".analytics__value--carbs",
    analyticsMostProteinVal: ".analytics__value--protein",
    analyticsMostCalsFood: ".analytics__food--cals",
    analyticsMostFatsFood: ".analytics__food--fats",
    analyticsMostCarbsFood: ".analytics__food--carbs",
    analyticsMostProteinFood: ".analytics__food--protein",
    // ADD FOOD FORM INPUTS
    addTitleInput: ".form__input-item--title",
    addCalsInput: ".form__input-item--cals",
    addFatsInput: ".form__input-item--fats",
    addCarbsInput: ".form__input-item--carbs",
    addProteinInput: ".form__input-item--protein",
    // BUTTONS
    saveMacroBtn: ".form__totals-submit",
    editMacrosBtn: ".overview__edit-macros",
    deleteFoodBtn: ".food__delete-btn",
    foodItemBtn: ".food__btn",
    foodSaveBtn: ".form__save-item",
    foodCancelBtn: ".form__item-cancel",
    foodDeleteBtn: ".food__delete-btn",
    // FOOD ITEM FORM INPUTS
    foodTitle: ".form__input-item--title",
    foodFats: ".form__input-item--fats",
    foodCarbs: ".form__input-item--carbs",
    foodProtein: ".form__input-item--protein",
    foodCals: ".form__input-item--cals",
    // FOOD ITEM FORM
    foodWrapper: ".food__wrapper",
    foodItem: ".food__item",
    // FOOD LOG ITEM DETAILS
    // Food item percentages
    fatsPercent: ".food__percent--fats",
    carbsPercent: ".food__percent--carbs",
    proteinPercent: ".food__percent--protein",
  };

  return {
    clearInputs: function () {
      var inputs = document.querySelectorAll(
        DOMstrings.bodyContainer + " input"
      );
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    },
    getTotalInputs: function () {
      var inputFats, inputCarbs, inputProtein, inputCals;
      inputFats = parseInt(
        document.querySelector(DOMstrings.inputTotalFats).value
      );
      inputCarbs = parseInt(
        document.querySelector(DOMstrings.inputTotalCarbs).value
      );
      inputProtein = parseInt(
        document.querySelector(DOMstrings.inputTotalProtein).value
      );
      inputCals = parseInt(
        document.querySelector(DOMstrings.inputTotalCals).value
      );
      return {
        fats: inputFats,
        carbs: inputCarbs,
        protein: inputProtein,
        cals: inputCals,
      };
    },
    getNewItemInput: function () {
      var inputTitle, inputFats, inputCarbs, inputProtein, inputCals;
      inputTitle = document.querySelector(DOMstrings.foodTitle).value;
      inputFats = parseInt(document.querySelector(DOMstrings.foodFats).value);
      inputCarbs = parseInt(document.querySelector(DOMstrings.foodCarbs).value);
      inputProtein = parseInt(
        document.querySelector(DOMstrings.foodProtein).value
      );
      inputCals = parseInt(document.querySelector(DOMstrings.foodCals).value);
      return {
        name: inputTitle,
        fats: inputFats,
        carbs: inputCarbs,
        protein: inputProtein,
        cals: inputCals,
      };
    },
    displayDashboard: function () {
      var welcomeSection, welcomeContainer, dashboard, bodyContainer;
      welcomeSection = document.querySelector(DOMstrings.welcomeSection);
      welcomeContainer = document.querySelector(DOMstrings.welcomeContainer);
      dashboard = document.querySelector(DOMstrings.dashboardContainer);
      bodyContainer = document.querySelector(DOMstrings.bodyContainer);

      // remove the no-scroll class from the body container if applicable
      if (bodyContainer.classList.contains("no-scroll")) {
        console.log("scroll removed");
        bodyContainer.classList.remove("no-scroll");
      }

      // Hide the welcome container content, then fade out the welcome section completely
      welcomeContainer.style.animation = "fade-out 1s forwards";
      welcomeSection.style.animation = "scale-out 1s forwards .5s";

      // display main dashboard
      dashboard.style.animation = "dash-slide-up 1s forwards 2s ease-in-out";
    },
    displayTotalCalories: function (cals, calsInput) {
      // determine if the calories calculated value is a number
      if (!isNaN(cals)) {
        calsInput.value = cals;
      }
    },
    displayTotalMacrosForm: function (currentMacros) {
      var header,
        text,
        welcomeSection,
        welcomeContainer,
        bodyContainer,
        dashboard,
        fatsInput,
        carbsInput,
        proteinInput,
        calsInput;
      welcomeSection = document.querySelector(DOMstrings.welcomeSection);
      welcomeContainer = document.querySelector(DOMstrings.welcomeContainer);
      bodyContainer = document.querySelector(DOMstrings.bodyContainer);
      dashboard = document.querySelector(DOMstrings.dashboardContainer);
      header = document.querySelector(DOMstrings.welcomeHeader);
      text = document.querySelector(DOMstrings.welcomeText);
      fatsInput = document.querySelector(DOMstrings.inputTotalFats);
      carbsInput = document.querySelector(DOMstrings.inputTotalCarbs);
      proteinInput = document.querySelector(DOMstrings.inputTotalProtein);
      calsInput = document.querySelector(DOMstrings.inputTotalCals);

      // 1. Pass the current total macro data to the total macros form
      fatsInput.textContent = currentMacros.fats;
      carbsInput.textContent = currentMacros.carbs;
      proteinInput.textContent = currentMacros.protein;
      calsInput.textContent = currentMacros.calories;
      // 2. animate the sections
      // scroll to top of page and disable scroll
      bodyContainer.classList.add("no-scroll");
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      // change text of welcome form to edit text
      header.textContent = "Edit Macros";
      text.textContent = "Enter your fats, carbs, and protein";
      // slide down dashboard
      dashboard.style.animation = "dash-slide-down .5s forwards ease-out";
      // fade in welcome section
      welcomeSection.style.animation = "total-macros-slide-in 1s forwards";
      welcomeContainer.style.animation = "fade-in 1s forwards";
    },
    displayFoodItemForm: function () {
      var foodLog, foodForm;
      foodLog = document.querySelector(DOMstrings.foodLogContainer);
      foodForm = document.querySelector(DOMstrings.itemContainer);

      // fade out the food log and animate the food form into visible view
      foodLog.style.animation = "food-log-slide-out 1s forwards";
      foodForm.style.animation = "item-container-slide-in 1s forwards";
    },
    foodLogOriginalState: function () {
      var foodLog, foodForm;
      foodLog = document.querySelector(DOMstrings.foodLogContainer);
      foodForm = document.querySelector(DOMstrings.itemContainer);

      // fade out the food log and animate the food form into visible view
      foodLog.style.animation = "food-log-slide-in 1s forwards";
      foodForm.style.animation = "item-container-slide-out 1s forwards";
      this.clearInputs();

      if (document.querySelector(".interface-message--error") !== null) {
        document.querySelector(".interface-message").style.animation =
          "fade-out 1s forwards";
        setTimeout(function () {
          document
            .querySelector(DOMstrings.bodyContainer)
            .removeChild(document.querySelector(".interface-message"));
        }, 1000);
      }
    },
    updateTotalTracker: function (obj) {
      // NOTE: try to store these selectors in an array and loop them instead of having to retype the same thing
      var curTotals, userMacros, container;
      curTotals = obj.curTotals;
      userMacros = obj.macros;
      container = document.querySelector(DOMstrings.totalSummaryContainer);
      // 1. set the current total for each category
      document.querySelector(DOMstrings.curTotalCals).textContent =
        curTotals.calories + "/" + userMacros.calories;
      document.querySelector(DOMstrings.curTotalFats).textContent =
        curTotals.fats + "/" + userMacros.fats;
      document.querySelector(DOMstrings.curTotalCarbs).textContent =
        curTotals.carbs + "/" + userMacros.carbs;
      document.querySelector(DOMstrings.curTotalProtein).textContent =
        curTotals.protein + "/" + userMacros.protein;
      // 3. set the width of the bars(value of the percentages from our currentTotals)
      document.querySelector(DOMstrings.calsProgressBar).style.width =
        curTotals.totalPercentages.caloriesBar >= 100
          ? "100%"
          : curTotals.totalPercentages.caloriesBar + "%";
      document.querySelector(DOMstrings.fatsProgressBar).style.width =
        curTotals.totalPercentages.fatsBar >= 100
          ? "100%"
          : curTotals.totalPercentages.fatsBar + "%";
      document.querySelector(DOMstrings.carbsProgressBar).style.width =
        curTotals.totalPercentages.carbsBar >= 100
          ? "100%"
          : curTotals.totalPercentages.carbsBar + "%";
      document.querySelector(DOMstrings.proteinProgressBar).style.width =
        curTotals.totalPercentages.proteinBar >= 100
          ? "100%"
          : curTotals.totalPercentages.proteinBar + "%";
      // 4. set the percentage text value for each total
      document.querySelector(DOMstrings.calsPercentVal).textContent =
        curTotals.totalPercentages.caloriesBar + "%";
      document.querySelector(DOMstrings.fatsPercentVal).textContent =
        curTotals.totalPercentages.fatsBar + "%";
      document.querySelector(DOMstrings.carbsPercentVal).textContent =
        curTotals.totalPercentages.carbsBar + "%";
      document.querySelector(DOMstrings.proteinPercentVal).textContent =
        curTotals.totalPercentages.proteinBar + "%";
      // 5. if any of the macro categories are over the limit, animate percentage value with warning keyframe
      if (curTotals.totalPercentages.caloriesBar > 100) {
        document.querySelector(DOMstrings.calsPercentVal).style.animation =
          "warning 3s infinite";
      }
      if (curTotals.totalPercentages.fatsBar > 100) {
        document.querySelector(DOMstrings.fatsPercentVal).style.animation =
          "warning 3s infinite";
      }
      if (curTotals.totalPercentages.carbsBar > 100) {
        document.querySelector(DOMstrings.carbsPercentVal).style.animation =
          "warning 3s infinite";
      }
      if (curTotals.totalPercentages.proteinBar > 100) {
        document.querySelector(DOMstrings.proteinPercentVal).style.animation =
          "warning 3s infinite";
      }
    },
    displayNewItem: function (obj, objPerentages) {
      var html, newHTML, foodTitle;
      // Check to see the length of the food name and make adjustments if it is too long
      foodTitle =
        obj.name.length >= 11 ? obj.name.substr(0, 11) + ".." : obj.name;
      // form the html to display the food item and replace the filler data with the new food item data
      html =
        '<div class="food__item" id="item-%id%"> <div class="food__preview"> <h3 class="heading-tertiary food__title">%name%</h3> <p class="text food__cals">%calories% Cals</p> <div class="food__options"> <button class="food__delete-btn"> <svg class="delete-icon"> <use xlink:href="img/sprite.svg#icon-remove_circle_outline" ></use> </svg> </button> </div> </div> <div class="food__details"> <div class="food__macro-group"> <h4 class="heading-sub food__macro-category"> Fats<span class="food__val food__fats">%fats%g</span> </h4> <div class="food__bar"> <span class="food__percent food__percent--fats"></span> </div> </div> <div class="food__macro-group"> <h4 class="heading-sub food__macro-category"> Carbs<span class="food__val food__carbs">%carbs%g</span> </h4> <div class="food__bar"> <span class="food__percent food__percent--carbs"></span> </div> </div> <div class="food__macro-group"> <h4 class="heading-sub food__macro-category"> Protein<span class="food__val food__protein">%protein%g</span> </h4> <div class="food__bar"> <span class="food__percent food__percent--protein"></span> </div> </div> </div> </div>';

      // replace all %..% values with actual item values
      newHTML = html.replace("%id%", obj.id);
      newHTML = newHTML.replace("%name%", foodTitle);
      newHTML = newHTML.replace("%calories%", obj.calories);
      newHTML = newHTML.replace("%fats%", obj.fats);
      newHTML = newHTML.replace("%carbs%", obj.carbs);
      newHTML = newHTML.replace("%protein%", obj.protein);
      // add the new html to the UI
      document
        .querySelector(DOMstrings.foodLogContainer)
        .insertAdjacentHTML("beforeend", newHTML);
      // change the widths of the percentage bars
      // note: try to add all of the querySelectors for the percentages into one nodelist (queryselectorall), create a callback function and loop through each calling the callback function which will set the width of each percent bar category
      document.querySelector(
        "#item-" + obj.id + " " + DOMstrings.fatsPercent
      ).style.width =
        objPerentages.fatsPercent > 100
          ? "100%"
          : objPerentages.fatsPercent + "%";
      document.querySelector(
        "#item-" + obj.id + " " + DOMstrings.carbsPercent
      ).style.width =
        objPerentages.carbsPercent > 100
          ? "100%"
          : objPerentages.carbsPercent + "%";
      document.querySelector(
        "#item-" + obj.id + " " + DOMstrings.proteinPercent
      ).style.width =
        objPerentages.proteinPercent > 100
          ? "100%"
          : objPerentages.proteinPercent + "%";
      // aninmate the food log and food form back to original state
      this.foodLogOriginalState();
    },
    removeItem: function (item) {
      var foodItem, foodLog;
      // use the item that was passed as the id to locate the food item
      foodItem = document.getElementById(item);
      // define the parent of the food item (food wrapper)
      foodLog = foodItem.parentNode;

      // remove the foodItem
      foodLog.removeChild(foodItem);
    },
    displayAnalytics: function (stats) {
      // set the calories

      document.querySelector(DOMstrings.analyticsMostCalsFood).textContent =
        stats.highestCals.name.length >= 12
          ? stats.highestCals.name.substr(0, 12) + "..."
          : stats.highestCals.name;
      document.querySelector(DOMstrings.analyticsMostCalsVal).textContent =
        stats.highestCals.value + " Cals";
      // set the fats
      document.querySelector(DOMstrings.analyticsMostFatsFood).textContent =
        stats.highestFats.name.length >= 12
          ? stats.highestFats.name.substr(0, 12) + "..."
          : stats.highestFats.name;
      document.querySelector(DOMstrings.analyticsMostFatsVal).textContent =
        stats.highestFats.value + "g";
      // set the carbs
      document.querySelector(DOMstrings.analyticsMostCarbsFood).textContent =
        stats.highestCarbs.name.length >= 12
          ? stats.highestCarbs.name.substr(0, 12) + "..."
          : stats.highestCarbs.name;
      document.querySelector(DOMstrings.analyticsMostCarbsVal).textContent =
        stats.highestCarbs.value + "g";
      // set the proteins
      document.querySelector(DOMstrings.analyticsMostProteinFood).textContent =
        stats.highestProtein.name.length >= 12
          ? stats.highestProtein.name.substr(0, 12) + "..."
          : stats.highestProtein.name;

      document.querySelector(DOMstrings.analyticsMostProteinVal).textContent =
        stats.highestProtein.value + "g";
    },
    displayMessage: function (message, type) {
      var parent, html, currentMessage, sameMessage;
      sameMessage = false;
      parent = document.querySelector(DOMstrings.bodyContainer);
      html =
        '<p class="interface-message interface-message--' +
        type +
        '">' +
        message +
        "</p>";

      // determine if there is an existing message currently being displayed
      if (document.querySelector(".interface-message") !== null) {
        // set the currentMessage to the message currently being displayed
        currentMessage = document.querySelector(".interface-message");
        if (currentMessage.textContent === message) {
          sameMessage = true;
        } else {
          // remove the current messge
          parent.removeChild(currentMessage);
        }
      }
      if (type === "success" && sameMessage === false) {
        // add the error message above the form
        parent.insertAdjacentHTML("afterbegin", html);
        // after the displaying the message, add a fade out animation
        document.querySelector(".interface-message").style.animation =
          "fade-in 0.5s ease-in, fade-out 1s 4s ease-out forwards";
      } else if (type === "error" && sameMessage === false) {
        // add the error message above the form
        parent.insertAdjacentHTML("afterbegin", html);
        document.querySelector(".interface-message").style.animation =
          "fade-in 0.5s ease-in";
      }
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// Main Controller
var Controller = (function (FoodCtrl, UICtrl) {
  // event listeners stored within this function
  var setupEventListeners = function () {
    var DOMobj;
    DOMobj = UICtrl.getDOMstrings();

    // Save User Macros event listener
    document
      .querySelector(DOMobj.saveMacroBtn)
      .addEventListener("click", function () {
        ctrlStoreTotals();
      });

    // user macro total input event listener (on input)
    document
      .querySelector(DOMobj.mainContentContainer)
      .addEventListener("input", function (e) {
        var totalFats, totalCarbs, totalProtein, totalCals, curForm;
        if (e.target.closest(DOMobj.formTotalsContainer)) {
          curForm = document.querySelector(DOMobj.formTotalsContainer);
        } else if (e.target.closest(DOMobj.addFoodForm)) {
          curForm = document.querySelector(DOMobj.addFoodForm);
        }

        // total macros form inputs
        if (curForm === document.querySelector(DOMobj.formTotalsContainer)) {
          totalFats = document.querySelector(DOMobj.inputTotalFats).value;
          totalCarbs = document.querySelector(DOMobj.inputTotalCarbs).value;
          totalProtein = document.querySelector(DOMobj.inputTotalProtein).value;
          totalCals = document.querySelector(DOMobj.inputTotalCals);
          // add food item form inputs
        } else if (curForm === document.querySelector(DOMobj.addFoodForm)) {
          totalFats = document.querySelector(DOMobj.addFatsInput).value;
          totalCarbs = document.querySelector(DOMobj.addCarbsInput).value;
          totalProtein = document.querySelector(DOMobj.addProteinInput).value;
          totalCals = document.querySelector(DOMobj.addCalsInput);
        }

        if (
          curForm !== "" &&
          totalFats !== "" &&
          totalFats !== "0" &&
          totalCarbs !== "" &&
          totalCarbs !== "0" &&
          totalProtein !== "" &&
          totalProtein !== "0"
        ) {
          ctrlDisplayTotalCals(totalFats, totalCarbs, totalProtein, totalCals);
        } else {
          totalCals.value = "";
        }
      });

    // Edit total macros event listener
    document
      .querySelector(DOMobj.editMacrosBtn)
      .addEventListener("click", function () {
        ctrlEditTotalMacros();
      });

    // Opening food item form (ADD FOOD BUTTON)
    document
      .querySelector(DOMobj.foodItemBtn)
      .addEventListener("click", function () {
        UICtrl.displayFoodItemForm();
      });

    // Cancel food item (food item form)
    document
      .querySelector(DOMobj.foodCancelBtn)
      .addEventListener("click", function () {
        UICtrl.foodLogOriginalState();
      });

    // Add food item
    document
      .querySelector(DOMobj.foodSaveBtn)
      .addEventListener("click", function (e) {
        ctrlAddFood(e);
      });

    // delete food item event listener
    document
      .querySelector(DOMobj.foodLogContainer)
      .addEventListener("click", function (e) {
        var deleteFoodBtn, itemID;
        deleteFoodBtn = document.querySelector(DOMobj.foodDeleteBtn);
        if (document.querySelector(DOMobj.foodItem) !== null) {
          if (e.target.closest(DOMobj.deleteFoodBtn)) {
            itemID = event.target.closest(".food__item").id;
            ctrlDeleteFood(itemID);
          }
        }
      });
  };

  // Total calories calculator (before user saves macros)
  var ctrlDisplayTotalCals = function (fats, carbs, protein, calsInput) {
    var cals;
    // 1. Calculate and display the total calories (before use saves macros)
    cals = FoodCtrl.calculateCalories(fats, carbs, protein);
    // 2. Display the total calories
    UICtrl.displayTotalCalories(cals, calsInput);
  };

  // Calculate User's total Calories/macros
  var ctrlStoreTotals = function () {
    var obj, error, success;
    error = "";
    // 1. Retrieve the users form inputs
    obj = UICtrl.getTotalInputs();
    // 2. validate these inputs and store them within the data object if valid (use if/else statement here)
    for (var i in obj) {
      if (obj[i] === "" || isNaN(obj[i]) || parseInt(obj[i]) <= 0) {
        error = "All fields must be correctly filled and greater than 0";
      }
    }

    if (error === "") {
      // 3. add the user totals to the data structure
      FoodCtrl.setUserMacros(obj);
      // 4. Display a success messages letting the user know their macros have been saved
      success =
        "SUCCESS: Your macros have been saved. You may now track your macros";
      messageHandler(success, "success");

      // 5. initialize TOTALS section, placing the total macros/calories for each section (e.g. 0/2000)
      updateSummary();

      // 6. Display main dashboard for macro tracker
      UICtrl.displayDashboard();
    } else {
      messageHandler(error, "error");
    }
  };
  // Add Food Item
  var ctrlAddFood = function (e) {
    var newItem, newItemNumbers, error, addedItem, itemPercentages, target;
    target = e.target;
    error = "";
    // 1. Retrieve the users form inputs via the add food item form
    newItem = UICtrl.getNewItemInput();
    // 2. validate the inputs and store them within the data object if valid
    newItemNumbers = {
      fats: newItem.fats,
      carbs: newItem.carbs,
      protein: newItem.protein,
    };

    for (var i in newItemNumbers) {
      if (newItemNumbers[i] === "" || isNaN(newItemNumbers[i])) {
        error = "ERROR: Macros (fats, carbs, protein) must be numeric!";
      }
    }
    if (newItem.name === "") {
      error = " ERROR: Please provide a name for the food item";
    }

    if (error === "") {
      // 3. Update the Food Log by adding the item to the food container through the UI controller
      addedItem = FoodCtrl.addFoodItem(newItem);
      // 4. calculate the percentages: send the addedItem to the FoodCtrl, calculate the percentage for each and return them as an object of percentages. pass this object along with te addedItem to the displayNewItem
      itemPercentages = FoodCtrl.calculateItemPercentages(addedItem);
      // 5. take the new item and add it to the UI
      UICtrl.displayNewItem(addedItem, itemPercentages);
      // 6. update the Totals section by adding each food specification from the item to each total
      updateSummary();
      // 7. update the statistcs if the item contains the highest value in one of the categories
      updateAnalytics();
    } else {
      messageHandler(error, "error");
    }
  };

  // Error Handler: deals with any error results we retrieve from our event listeners and displays them
  var messageHandler = function (message, type) {
    // call the display message function within our UI Controller
    UICtrl.displayMessage(message, type);

    // }
  };

  // Edit total macros state: switches the state of the total macros form back to edittable
  var ctrlEditTotalMacros = function () {
    // 1. retrieve the current values of the total macros via the food controller
    currentMacros = FoodCtrl.getTotalMacros();
    // 2. access the UI via the event target and make the macro form edittable once again
    UICtrl.displayTotalMacrosForm(currentMacros);
  };

  // Delete Food Item
  var ctrlDeleteFood = function (item) {
    var splitItem, itemID;
    // 1. retrieve the event target id where the delete button was clicked
    splitItem = item.split("-");
    itemID = splitItem[1];
    // 2. locate the ID of the food item within our data structure via the FoodController and delete it
    FoodCtrl.deleteFoodItem(parseInt(itemID));
    // 3. update our UIController after we have deleted the item
    UICtrl.removeItem(item);
    // 4. Update our totals
    updateSummary();
    // 5. Update our statistics
    updateAnalytics();
  };

  // Update Totals
  var updateSummary = function () {
    // we will use updateOBJ to store the data we will need to use for updating our UI
    var updateOBJ = {};
    // 1. calculate totals using our FoodController method by tallying up each category values for each item
    FoodCtrl.calculateCurrentTotals();
    // 2. calculate the total percentages
    FoodCtrl.calculateTotalPercentages();
    // 3. get the totals from our Food Controller (macros and current)
    updateOBJ.curTotals = FoodCtrl.getCurrentTotals();
    updateOBJ.macros = FoodCtrl.getTotalMacros();
    // 4. Update the UIController with our updated data
    UIController.updateTotalTracker(updateOBJ);
  };

  // Update Statistics
  var updateAnalytics = function () {
    var statsObj;
    // 1. loop through the data structure via the FoodController and set the highest value per category
    FoodCtrl.calculateStatistics();
    // 2. get the statistics calculate in step one and retrieve it in an object
    statsObj = FoodCtrl.getAnalytics();
    // 3. Update the UI to display the updated statistics
    UICtrl.displayAnalytics(statsObj);
  };

  return {
    init: function () {
      // clear all input fields
      UICtrl.clearInputs();
      console.log("app has started");
      setupEventListeners();
    },
  };
})(FoodController, UIController);

Controller.init();
