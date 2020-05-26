var FoodController = (function () {
  var Food = function (id, name, fats, carbs, protein, cals) {
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
      proteins: 0,
    },
    currentTotals: {
      calories: 0,
      fats: 0,
      carbs: 0,
      proteins: 0,
      foodItems: [],
    },
    statistics: {
      highestCals: 0,
      highestFats: 0,
      highestCarbs: 0,
      highestProteins: 0,
    },
  };
})();
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
    totalFormSubmit: "#totals-submit",
    totalFats: ".total__fats",
    totalCarbs: ".total__carbs",
    totalProtein: ".total__protein",
    totalFatsPercentage: ".total__percent--fats",
    totalCarbsPercentage: ".total__percent--carbs",
    totalProteinPercentage: ".total__percent--protein",
    totalFatsBar: ".totals__percentage--fats",
    totalCarbsBar: ".totals__percentage--carbs",
    totalProteinBar: ".totals__percentage--protein",
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

  return {
    DOMstrings,
  };
})();
var Controller = (function (FoodCtrl, UICtrl) {
  var DOMobj = UICtrl.DOMstrings;
  console.log(DOMobj);
  // event listeners stored within this function
  var setupEventListeners = function () {
    document
      .querySelector(DOMobj.formTotalsContainer)
      .addEventListener("click", function () {
        alert("clicked");
      });
  };
  // Calculate User's total Calories/macros
  var ctrlStoreTotals = function () {
    // 1. Retrieve the users form inputs
    // 2. validate these inputs and store them within the data object if valid (use if/else statement here)
    // 3. Update the Macro Form VIA the UI to change the macro form into display values instead of input elements
    // 4. initialize TOTALS section, placing the total macros/calories for each section (e.g. 0/2000)
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
  var updateTotals = function () {
    // 1. calculate totals using our FoodController method by tallying up each category values for each item
    // 2. get the totals from our Food Controller (first step was just to recalculate)
    // 3. Update the UIController with our updated data
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
