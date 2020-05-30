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
    error: "",
  };

  var totalCalories = function (obj) {
    var fatCals, carbCals, proteinCals, totalCals;
    // 1. Convert each category into its caloric value
    fatCals = obj.fats * 9;
    carbCals = obj.carbs * 4;
    proteinCals = obj.protein * 4;
    totalCals = fatCals + carbCals + proteinCals;
    return totalCals;
  };

  return {
    setUserMacros: function (obj) {
      var totalCals;
      // 1. calculate the total calories first
      totalCals = totalCalories(obj);
      data.mainTotals.calories = totalCals;
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
      }
    },
    addFoodItem: function (newItem) {
      var totalCals, foodItems, ID, newFood;
      foodItems = data.foodItems;

      // set the id to the previous food item's id + 1, else if foodItems length is less than 1 aka 0, set id to 1
      ID = foodItems.length >= 1 ? foodItems[foodItems.length - 1].id + 1 : 1;
      totalCals = totalCalories(newItem);

      // declare new food item
      newFood = new Food(
        ID,
        newItem.name,
        totalCals,
        newItem.fats,
        newItem.carbs,
        newItem.protein
      );
      // add the new food item to the data structure
      foodItems.push(newFood);

      return newFood;
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
      var foodItems, stats;
      foodItems = data.foodItems;
      stats = data.statistics;
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
    setError: function (error) {
      // set the data structure error to the current error
      data.error = error;
    },
    getError: function () {
      return data.error;
    },
    getStatistics: function () {
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
    userName: ".info__name",
    currentDate: ".info__date",
    progressStatus: ".info__status",
    formTotalsContainer: ".form__totals",
    inputTotalFats: ".form__input--fats",
    inputTotalCarbs: ".form__input--carbs",
    inputTotalProtein: ".form__input--protein",
    inputTotalCals: ".form__input--protein",
    totalsSubmitBtn: "#totals-submit",
    totalSummaryContainer: ".totals__wrapper",
    // current totals
    totalCurCals: ".totals__current-cals",
    totalCurFats: ".totals__current-fats",
    totalCurCarbs: ".totals__current-carbs",
    totalCurProtein: ".totals__current-protein",
    // user macros
    totalUserCals: ".totals__total--cals",
    totalUserFats: ".totals__total--fats",
    totalUserCarbs: ".totals__total--carbs",
    totalUserProtein: ".totals__total--protein",
    // total percentage bars
    totalCalsBar: ".totals__percentage--cals",
    totalFatsBar: ".totals__percentage--fats",
    totalCarbsBar: ".totals__percentage--carbs",
    totalProteinBar: ".totals__percentage--protein",
    // total percent values
    totalCalsPercentage: ".totals__percent--cals",
    totalFatsPercentage: ".totals__percent--fats",
    totalCarbsPercentage: ".totals__percent--carbs",
    totalProteinPercentage: ".totals__percent--protein",
    // Food item form inputs
    addFoodContainer: ".form__add",
    foodName: ".form__add--food",
    foodFats: ".form__add--fats",
    foodCarbs: ".form__add--carbs",
    foodProtein: ".form__add--protein",
    // Food item percentages
    fatsPercent: ".food__percent--fats",
    carbsPercent: ".food__percent--carbs",
    proteinPercent: ".food__percent--protein",
    // statistics
    statCalsValue: ".statistics__value--cals",
    statFatsValue: ".statistics__value--cals",
    statCarbsValue: ".statistics__value--cals",
    statProteinValue: ".statistics__value--cals",
    statCals: ".statistics__item--cals",
    statFats: ".statistics__item--fats",
    statCarbs: ".statistics__item--carbs",
    statProtein: ".statistics__item--protein",
    addFormSubmit: "#add-submit",
    foodWrapper: ".food__wrapper",
    // date
    date: ".info__date",
  };

  var summaryFractions = function (obj) {};

  return {
    getTotalInputs: function () {
      var inputFats, inputCarbs, inputProtein;
      inputFats = parseInt(
        document.querySelector(DOMstrings.inputTotalFats).value
      );
      inputCarbs = parseInt(
        document.querySelector(DOMstrings.inputTotalCarbs).value
      );
      inputProtein = parseInt(
        document.querySelector(DOMstrings.inputTotalProtein).value
      );
      return {
        fats: inputFats,
        carbs: inputCarbs,
        protein: inputProtein,
      };
    },
    getNewItemInput: function () {
      var inputName, inputFats, inputCarbs, inputProtein;
      inputName = document.querySelector(DOMstrings.foodName).value;
      inputFats = parseInt(document.querySelector(DOMstrings.foodFats).value);
      inputCarbs = parseInt(document.querySelector(DOMstrings.foodCarbs).value);
      inputProtein = parseInt(
        document.querySelector(DOMstrings.foodProtein).value
      );
      return {
        name: inputName,
        fats: inputFats,
        carbs: inputCarbs,
        protein: inputProtein,
      };
    },
    displayUserMacros: function (obj) {
      var totalsForm, defaultHTML, displayHTML;
      totalsForm = document.querySelector(DOMstrings.formTotalsContainer);
      defaultHTML =
        '<input type="text" class="form__input form__input--fats form__input--dark"  value="FATS: %fats%" readonly/> <input type="text" class="form__input form__input--carbs form__input--dark"  value="CARBS: %carbs%" readonly/> <input type="text" class="form__input form__input--protein form__input--dark" value="PROTEIN: %protein%" readonly/> <input type="text" class="form__input form__input--cals form__input--dark" readonly value="CALORIES: %calories%" /> <button class="form__submit form-totals__submit form__submit--dark" id="totals-submit" > + </button>';
      displayHTML = defaultHTML.replace("%calories%", obj.calories);
      displayHTML = displayHTML.replace("%fats%", obj.fats);
      displayHTML = displayHTML.replace("%carbs%", obj.carbs);
      displayHTML = displayHTML.replace("%protein%", obj.protein);
      totalsForm.innerHTML = displayHTML;
    },
    updateTotalTracker: function (obj) {
      // NOTE: try to store these selectors in an array and loop them instead of having to retype the same thing
      var curTotals, userMacros, container;
      curTotals = obj.curTotals;
      userMacros = obj.macros;
      container = document.querySelector(DOMstrings.totalSummaryContainer);
      // 1. set the current total for each category
      document.querySelector(DOMstrings.totalCurCals).textContent =
        curTotals.calories;
      document.querySelector(DOMstrings.totalCurFats).textContent =
        curTotals.fats;
      document.querySelector(DOMstrings.totalCurCarbs).textContent =
        curTotals.carbs;
      document.querySelector(DOMstrings.totalCurProtein).textContent =
        curTotals.protein;
      // 2. set the total user Macros
      document.querySelector(DOMstrings.totalUserCals).textContent =
        "/" + userMacros.calories;
      document.querySelector(DOMstrings.totalUserFats).textContent =
        "/" + userMacros.fats;
      document.querySelector(DOMstrings.totalUserCarbs).textContent =
        "/" + userMacros.carbs;
      document.querySelector(DOMstrings.totalUserProtein).textContent =
        "/" + userMacros.protein;
      // 3. set the width of the bars(value of the percentages from our currentTotals)
      document.querySelector(DOMstrings.totalCalsBar).style.width =
        curTotals.totalPercentages.caloriesBar > 100
          ? "100%"
          : curTotals.totalPercentages.caloriesBar + "%";
      document.querySelector(DOMstrings.totalFatsBar).style.width =
        curTotals.totalPercentages.fatsBar > 100
          ? "100%"
          : curTotals.totalPercentages.fatsBar + "%";
      document.querySelector(DOMstrings.totalCarbsBar).style.width =
        curTotals.totalPercentages.carbsBar > 100
          ? "100%"
          : curTotals.totalPercentages.carbsBar + "%";
      document.querySelector(DOMstrings.totalProteinBar).style.width =
        curTotals.totalPercentages.proteinBar > 100
          ? "100%"
          : curTotals.totalPercentages.proteinBar + "%";
      // 4. set the percentage text value for each total
      document.querySelector(DOMstrings.totalCalsPercentage).textContent =
        curTotals.totalPercentages.caloriesBar + "%";
      document.querySelector(DOMstrings.totalFatsPercentage).textContent =
        curTotals.totalPercentages.fatsBar + "%";
      document.querySelector(DOMstrings.totalCarbsPercentage).textContent =
        curTotals.totalPercentages.carbsBar + "%";
      document.querySelector(DOMstrings.totalProteinPercentage).textContent =
        curTotals.totalPercentages.proteinBar + "%";
      // 5. if the macro exceeds 100%, give it a warning class

      // calories anim-warning validation
      curTotals.totalPercentages.caloriesBar > 100
        ? document
            .querySelector(DOMstrings.totalCalsBar)
            .classList.contains("anim-warning")
          ? " "
          : document
              .querySelector(DOMstrings.totalCalsBar)
              .classList.add("anim-warning")
        : document
            .querySelector(DOMstrings.totalCalsBar)
            .classList.remove("anim-warning");

      // fats anim-warning validation
      curTotals.totalPercentages.fatsBar > 100
        ? document
            .querySelector(DOMstrings.totalFatsBar)
            .classList.contains("anim-warning")
          ? ""
          : document
              .querySelector(DOMstrings.totalFatsBar)
              .classList.add("anim-warning")
        : document
            .querySelector(DOMstrings.totalFatsBar)
            .classList.remove("anim-warning");

      // carbs anim-warning validation
      curTotals.totalPercentages.carbsBar > 100
        ? document
            .querySelector(DOMstrings.totalCarbsBar)
            .classList.contains("anim-warning")
          ? ""
          : document
              .querySelector(DOMstrings.totalCarbsBar)
              .classList.add("anim-warning")
        : document
            .querySelector(DOMstrings.totalCarbsBar)
            .classList.remove("anim-warning");

      // protein anim-warning validation
      curTotals.totalPercentages.proteinBar > 100
        ? document
            .querySelector(DOMstrings.totalProteinBar)
            .classList.contains("anim-warning")
          ? ""
          : document
              .querySelector(DOMstrings.totalProteinBar)
              .classList.add("anim-warning")
        : document
            .querySelector(DOMstrings.totalProteinBar)
            .classList.remove("anim-warning");
    },
    displayNewItem: function (obj, objPerentages) {
      var html, newHTML;
      html =
        '<div class="food__item" id="item-%id%"><div class="food__item__wrapper"><div class="food__head"><span class="food__theme food__theme--0"></span><div class="food__intro"><h2 class="food__title">%name%</h2><h3 class="food__cals">%calories% CALORIES</h3></div> </div> <div class="food__content"><div class="food__macro food__fats"><div class="food__info"><h4 class="food__category">FATS</h4><p class="food__value">%fats%</p></div><div class="food__percentage"><div class="food__bar"><div class="food__percent food__percent--fats"></div> </div> </div></div> <div class="food__macro food__carbs"> <div class="food__info"><h4 class="food__category">CARBS</h4><p class="food__value">%carbs%</p></div> <div class="food__percentage"><div class="food__bar"><div class="food__percent food__percent--carbs"></div> </div> </div> </div><div class="food__macro food__protein"><div class="food__info"><h4 class="food__category">PROTEIN</h4><p class="food__value">%protein%</p></div><div class="food__percentage"><div class="food__bar"><div class="food__percent food__percent--protein"></div></div></div></div></div></div></div>';
      // replace all %..% values with actual item values
      newHTML = html.replace("%id%", obj.id);
      newHTML = newHTML.replace("%name%", obj.name);
      newHTML = newHTML.replace("%calories%", obj.calories);
      newHTML = newHTML.replace("%fats%", obj.fats);
      newHTML = newHTML.replace("%carbs%", obj.carbs);
      newHTML = newHTML.replace("%protein%", obj.protein);
      // add the new html to the UI
      document
        .querySelector(DOMstrings.foodWrapper)
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
    },
    displayStatistics: function (stats) {
      // set the calories
      document.querySelector(DOMstrings.statCals).textContent =
        stats.highestCals.name;
      document.querySelector(DOMstrings.statCalsValue).textContent =
        stats.highestCals.value + "g";
      // set the fats
      document.querySelector(DOMstrings.statFats).textContent =
        stats.highestFats.name;
      document.querySelector(DOMstrings.statFatsValue).textContent =
        stats.highestFats.value + "g";
      // set the carbs
      document.querySelector(DOMstrings.statCarbs).textContent =
        stats.highestCarbs.name;
      document.querySelector(DOMstrings.statCarbsValue).textContent =
        stats.highestCarbs.value + "g";
      // set the proteins
      document.querySelector(DOMstrings.statProtein).textContent =
        stats.highestProtein.name;
      document.querySelector(DOMstrings.statProteinValue).textContent =
        stats.highestProtein.value + "g";
    },
    displayMessage: function (event, message, type) {
      var parent, html;
      parent = event.parentNode;
      console.log(parent);
      html = '<p class="message message--' + type + '">' + message + "</p>";
      if (type === "error") {
        // determine if there is an error message present on the page
        // if there is an error message, remove it before applying the new message
        if (document.querySelector(".message--error") !== null) {
          document
            .querySelector(".message--error")
            .parentNode.removeChild(document.querySelector(".message--error"));
        }
      } else if (
        type === "success" &&
        document.querySelector(".message--error") !== null
      ) {
        document
          .querySelector(".message--error")
          .parentNode.removeChild(document.querySelector(".message--error"));
      }
      // add the error message above the form
      parent.insertAdjacentHTML("beforebegin", html);
    },
    setDate: function () {
      var todayDate = new Date();

      document.querySelector(
        DOMstrings.date
      ).textContent = todayDate.toDateString();
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();
// Controller controller
var Controller = (function (FoodCtrl, UICtrl) {
  var macroSet = false;
  // event listeners stored within this function
  var setupEventListeners = function () {
    var DOMobj;
    DOMobj = UICtrl.getDOMstrings();
    document
      .querySelector(DOMobj.formTotalsContainer)
      .addEventListener("click", function (e) {
        var el;
        el = e.target;
        if (el.classList.contains("form-totals__submit")) {
          ctrlStoreTotals(e);
        }
      });

    document
      .querySelector(DOMobj.addFormSubmit)
      .addEventListener("click", function (e) {
        var error = "";
        if (macroSet) {
          ctrlAddFood(e);
        } else {
          error =
            "ERROR: Please fill out your total macros before adding a food item.";
          messageHandler(e.target, error, "error");
        }
      });
  };
  // Calculate User's total Calories/macros
  var ctrlStoreTotals = function (e) {
    var obj, error, success, target;
    target = e.target;
    error = "";
    // 1. Retrieve the users form inputs
    obj = UICtrl.getTotalInputs();
    // 2. validate these inputs and store them within the data object if valid (use if/else statement here)
    for (var i in obj) {
      if (obj[i] === "" || isNaN(obj[i]) || parseInt(obj[i]) <= 0) {
        error =
          "All fields must be correctly filled (all numeric and greater than 0)";
      }
    }

    if (error === "") {
      // 3. add the user totals to the data structure
      FoodCtrl.setUserMacros(obj);
      // 4. retrieve the updated object (including the total calories)
      var userMacros = FoodCtrl.getTotalMacros();
      // 5. Display a success messages letting the user know their macros have been saved
      success =
        "SUCCESS: Your personal macros have been successfully recorded. You may now track your food items";
      messageHandler(target, success, "success");
      // 6. Update the Macro Form VIA the UI to change the macro form into display values instead of input elements
      UICtrl.displayUserMacros(userMacros);
      // 7. initialize TOTALS section, placing the total macros/calories for each section (e.g. 0/2000)
      updateSummary();
      // 8. set the macroSet to true, indicating the user has entered their maros. this will allow them to add food items
      macroSet = true;
    } else {
      messageHandler(target, error, "error");
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
        error = "ERROR: Please fill in ALL macro information with numbers only";
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
      updateStatistics();
    } else {
      messageHandler(target, error, "error");
    }
  };

  // Error Handler: deals with any error results we retrieve from our event listeners and displays them
  var messageHandler = function (event, message, type) {
    var dataError;

    if (type === "error") {
      dataError = FoodCtrl.getError();

      if (dataError === "" || dataError !== message) {
        FoodCtrl.setError(message);
        UICtrl.displayMessage(event, message, type);
      } else {
        console.log("same message");
      }
    } else if (type === "success") {
      UICtrl.displayMessage(event, message, "success");
    }
  };
  // Delete Food Item
  var ctrlDeleteFood = function (event) {
    // 1. retrieve the event target id where the delete button was clicked
    // 2. locate the ID of the food item within our data structure via the FoodController and delete it
    // 3. update our UIController after we have deleted the item
    // 4. Update our totals
    // 5. Update our statistics
  };
  // Edit Food Item
  var ctrlEditFood = function (event) {
    // 1. retrieve the event target id where the edit button was clicked
    // 2.locate the id of this food item using the event.target.id in our data structure to enable edit mode
    // 3. update the UI to turn the editState to true (so nothing else can be processed while user is editting)
  };
  // Save Food Item
  var saveEdittedFood = function (event) {
    // 1. retrieve the inputs from the editted item and validate them. update the data structure if valid
    // 2. retrieve step 1 as an object and update the UI by updating the HTML, reverting it back to it's normal, unedditable state
    // 3. update the food totals via the UI
    // 4. Update the statistics
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
  var updateStatistics = function () {
    var statsObj;
    // 1. loop through the data structure via the FoodController and set the highest value per category
    FoodCtrl.calculateStatistics();
    // 2. get the statistics calculate in step one and retrieve it in an object
    statsObj = FoodCtrl.getStatistics();
    // 3. Update the UI to display the updated statistics
    UICtrl.displayStatistics(statsObj);
  };

  return {
    init: function () {
      console.log("app has started");
      UICtrl.setDate();
      setupEventListeners();
    },
  };
})(FoodController, UIController);

Controller.init();
