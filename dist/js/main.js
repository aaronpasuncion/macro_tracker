// Food Controller
var FoodController = (function () {
  var Food = function (
    id,
    name,
    fats,
    carbs,
    protein,
    cals,
    fatsPercent,
    carbsPercent,
    proteinPercent
  ) {
    this.id = id;
    (this.name = name),
      (this.fats = fats),
      (this.carbs = carbs),
      (this.protein = protein),
      (this.cals = cals);
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
    foodItems: [
      {
        calories: 122,
        fats: 12,
        carbs: 21,
        protein: 18,
      },
      {
        calories: 322,
        fats: 22,
        carbs: 70,
        protein: 45,
      },
    ],
    statistics: {
      highestCals: 0,
      highestFats: 0,
      highestCarbs: 0,
      highestprotein: 0,
    },
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
      console.log(totalCals);
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
      foodArr.forEach(function (cur) {
        curTotals.calories += cur.calories;
        curTotals.fats += cur.fats;
        curTotals.carbs += cur.carbs;
        curTotals.protein += cur.protein;
      });
    },
    getCurrentTotals: function () {
      return data.currentTotals;
    },
    calculateTotalPercentages: function () {
      var curTotals, mainMacros, percentages;
      curTotals = data.currentTotals;
      mainMacros = data.mainTotals;
      percentages = data.currentTotals.totalPercentages;

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
      console.log(percentages);
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
    //
    statCalsValue: ".statistics__value--cals",
    statFatsValue: ".statistics__value--cals",
    statCarbsValue: ".statistics__value--cals",
    statProteinValue: ".statistics__value--cals",
    statCals: ".statistics__item--cals",
    statFats: ".statistics__item--cals",
    statCarbs: ".statistics__item--cals",
    statProtein: ".statistics__item--cals",
    inputAddFats: ".form__add--fats",
    inputAddCarbs: ".form__add--carbs",
    inputAddProtein: ".form__add--protein",
    inputAddCals: ".form__add--protein",
    addFormSubmit: "#add-submit",
  };

  var summaryFractions = function (obj) {};

  return {
    getTotalInputs: function () {
      var inputFats, inputCarbs, inputProtein;
      inputFats = document.querySelector(DOMstrings.inputTotalFats).value;
      inputCarbs = document.querySelector(DOMstrings.inputTotalCarbs).value;
      inputProtein = document.querySelector(DOMstrings.inputTotalProtein).value;
      return {
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
        curTotals.totalPercentages.caloriesBar + "%";
      document.querySelector(DOMstrings.totalFatsBar).style.width =
        curTotals.totalPercentages.fatsBar + "%";
      document.querySelector(DOMstrings.totalCarbsBar).style.width =
        curTotals.totalPercentages.carbsBar + "%";
      document.querySelector(DOMstrings.totalProteinBar).style.width =
        curTotals.totalPercentages.proteinBar + "%";
      // 4. set the percentage text value for each total
      document.querySelector(DOMstrings.totalCalsPercentage).textContent =
        curTotals.totalPercentages.caloriesBar + "%";
      document.querySelector(DOMstrings.totalFatsPercentage).textContent =
        curTotals.totalPercentages.fatsBar + "%";
      document.querySelector(DOMstrings.totalCarbsPercentage).textContent =
        curTotals.totalPercentages.carbsBar + "%";
      document.querySelector(DOMstrings.totalProteinPercentage).textContent =
        curTotals.totalPercentages.proteinBar + "%";
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();
// Controller controller
var Controller = (function (FoodCtrl, UICtrl) {
  // event listeners stored within this function
  var setupEventListeners = function () {
    var DOMobj = UICtrl.getDOMstrings();
    document
      .querySelector(DOMobj.formTotalsContainer)
      .addEventListener("click", function (e) {
        var el;
        el = e.target;
        if (el.classList.contains("form-totals__submit")) {
          ctrlStoreTotals();
        }
      });
  };
  // Calculate User's total Calories/macros
  var ctrlStoreTotals = function () {
    var obj, error;
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
      // 5. Update the Macro Form VIA the UI to change the macro form into display values instead of input elements
      UICtrl.displayUserMacros(userMacros);
      // 6. initialize TOTALS section, placing the total macros/calories for each section (e.g. 0/2000)
      updateSummary();
    } else {
      console.log(error);
    }
  };
  // Add Food Item
  var ctrlAddFood = function () {
    // 1. Retrieve the users form inputs via the add food item form
    // 2. validate the inputs and store them within the data object if valid
    // 3. Update the Food Log by adding the item to the food container through the UI controller
    // 4. update the Totals section by adding each food specification from the item to each total
    // 5. update the statistcs if the item contains the highest value in one of the categories
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
    // 1. loop through the data structure via the FoodController and set the highest value per category
    // 2. get the statistics calculate in step one and retrieve it in an object
    // 3. Update the UI to display the updated statistics
  };

  return {
    init: function () {
      var editState = false;
      console.log("app has started");
      setupEventListeners();
    },
  };
})(FoodController, UIController);

Controller.init();
