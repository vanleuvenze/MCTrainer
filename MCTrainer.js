$(document).ready(function () {

  var wineArray = [];
  var beerArray = [];


  //======================//
  //WINE
  var riesling = new Wine("Dry Riesling", "White", 'medium', "Municipal Wine Makers", "CA", "Santa Barbara", 1);
  wineArray.push(riesling);

  //Whites
  var cheninBlanc = new Wine("Chenin Blanc", "White", 'light',"Picnic Wine co.", "CA", "Clarksburg", 2);    
  wineArray.push(cheninBlanc);  

  var viognier = new Wine ("Viognier", "White", 'medium', "Campovida", "CA", "Hopland", 3);
  wineArray.push(viognier);

  var sauvBlanc = new Wine ("Sauvignon Blanc", "White", 'medium', "Preston of Dry Creek", "CA", "Sonoma County", 4);
  wineArray.push(sauvBlanc);

  var albarino = new Wine ("Albarino", "White", 'light', "Ferdinand", "CA", "Napa", 5);
  wineArray.push(albarino);


  //Rose
  var cuvee = new Wine ("Isabel's Cuvee", "Rose", 'light', "Donkey & Goat", "CA", "Berkeley", 6);
  wineArray.push(cuvee);



  //Red
  var pinot = new Wine ("Pinot Noir", "Red", 'light', "Deux Punx", "CA", "Carneros", 7);
  wineArray.push(pinot);

  var charbono = new Wine ("Charbono", "Red", 'medium', "Calder", "CA", "Mendoncino",8);
  wineArray.push(charbono);

  var petiteSirah = new Wine ("Petite Sirah", "Red", 'full', "P'tit Payson", "CA", "Monterey",9);
  wineArray.push(petiteSirah);

  var cinsault = new Wine ("Cinsault", "Red", 'light', "Turley", "CA", "Lodi",10);
  wineArray.push(cinsault);

  var mashup = new Wine ("Mashup", "Red", 'full', "Periscope Cellars", "CA", "Oakland",11);
  wineArray.push(mashup);

  var syrah = new Wine ("Syrah", "Red", 'full', "Copain", "CA", "Sonoma",12);
  wineArray.push(syrah);


  //==============================//
  //BEER

  var sculpin = new Beer ("Sculpin", "IPA", 'hops', "Ballast Point", "CA", "San Diego", 'a');
  beerArray.push(sculpin);

  var pale31 = new Beer ("Pale 31", "Pale Ale", 'hops', "Firestone Walker", "CA", "Paso Robles", 'b');
  beerArray.push(pale31);

  var dogPatchSour = new Beer ("Dogpatch Sour", "Barrel Aged Sour", 'yeast', "Almanac", "CA", "San Francisco", 'c');
  beerArray.push(dogPatchSour);

  var inferno = new Beer ("Inferno", "Belgian Golden Strong", 'yeast', "Lost Abbey", "CA", "San Diego", 'd');
  beerArray.push(inferno);

  var steelheadStout = new Beer ("Steelhead Stout", "Stout", 'malt', "Mad River", "CA", "Blue Lake", 'e');
  beerArray.push(steelheadStout);

  var lilSumpin = new Beer ("Lil Sumpin", "American Strong", 'hops', "Lagunitas", "CA", "Petaluma", 'f');
  beerArray.push(lilSumpin);

  var oldStock = new Beer ("Old Stock Ale", "Old Ale", 'malt', "North Coast", "CA", "Ft. Bragg", 'g');
  beerArray.push(oldStock);

//These are different permutations of the wine and beer information.  The shuffled wine arrays assure that each time the quiz is taken, the questions are in different order.  The wine and beer objects are a way to access a specific beverage by its name.  And the 'byId' objects are a way to access the name of a specific beverage by its ID.
  var shuffledWine = _.shuffle(wineArray);
  var shuffledBeer = _.shuffle(beerArray);
  var wineObject = byName(wineArray);
  var beerObject = byName(beerArray);
  var wineById = byId(shuffledWine);
  var beerById = byId(shuffledBeer)

  //============================//
  //Constructors
  function Beer (name, style, driver, brewery, state, region, id) {
      this.name = name;
      this.style = style;
      this.driver = driver;
      this.brewery = brewery;
      this.state = state;
      this.region = region;
      this.id = id;
      this.isBeer = true;
      this.notes = '';
      this.message =  "This is the " + this.name + " from the folks at " + this.brewery + " in " + this.region + "," + " California- " + "think " + this.driver + ".";
  }
       
  function Wine (name, type, body, vineyard, state, region, id){
      this.name = name;
      this.type = type;
      this.body = body;
      this.vineyard = vineyard;
      this.state = state;
      this.region = region;
      this.id = id;
      this.isWine= true;
      this.notes = "";
      this.message =  "This is the " + this.name + "- a " + this.body + "  bodied " + this.type + " from the folks at " + this.vineyard + " in " + this.region + "," + " California.";
  }


  //==========================//
  //Helpers

  function byName (array) {
      var named = {};
      array.forEach(function(beverage) {
          named[beverage.name] = beverage;
      });
      return named;
  }
  function byId (array) {
    var id = {};
    _.each(array, function (beverage) {
      id[beverage.id] = beverage.name;
    })
    return id;
  }

  function accessBev (callback, name) {
          callback(name);
          }

// These are all variables that interact with the onclick events and are used to reference different featurs of 
  var winePrompts = ['Type', 'body', 'Vineyard', 'State', 'Region'];
  var beerPrompts = ['Style', 'Think: yeast/hops/malt', 'Brewery' , 'State', 'Region'];
  var isBeer;
  var questions = [];
  var completed = 0;
  var right = 0;
  var bottleId;
  var individualProgress = 0;
  var progress = 0;
  var beerAwards = 0;
  var wineAwards = 0;
  var bev;
  var wrong = [];
  var completedWine = $("<img class='award' src=wineFinish.jpeg style='width: 400px; height: 280px;'>");
  var completedBeer = $("<img class='award' src=beerFinish.jpg style='width: 300px; height: 200px;'>");
  var completedQuiz = $("<img class='award' src=completedQuiz.jpg style='width: 320px; height: 300px;'>");
  var xImage = $("<img class='prog' src='x.png' style='width: 30px; height: 30px;'>");

  function awardImage (image) {
    $('.mainImage').remove();
    $('.award').remove();
    $('.layout').prepend(image);
  }
  function appendProgress(image) {
    $('#progress').append(image);
  }


  function quiz (array, obj) {
    var getsBottle = false;
    var right = 0;

    var pickName = function () {
      bev = array[progress].name;
      bottleId = obj[bev].id;
      progress++;
    };
    //Here we pick the first beverage name in the shuffled array provided in the call to quiz (which will run when either the grapes are clicked or the hops are clicked).  We also set 'questions' to be an empty array each time quiz runs to assure that we arent adding to old questions.
    pickName();
    questions = [];

    //This displays the name of the current wine.
    $('#atHand').text('|| ' +bev.toUpperCase()+ ' ||');

    //Here we are creating the questions array.
    if (obj.hasOwnProperty(bev)) {
      _.each(obj[bev],function (property, key) {
        if (key !== 'name' && key !== 'notes' && key !== 'id' && key !== 'message' && key !== 'isWine' & key !== 'isBeer') {
          questions.push(property.replace(/\s+/g, '').toLowerCase());
        }
      }) 
    }
    //I'll leave this log in so that you can see the answers :)
    console.log(questions);

    //Here we decide whether or not the beverage at hand is a beer and change the first question prompt accordingly.
    isBeer = array[0].hasOwnProperty('style');
    if (isBeer) { 
      $('#question').text(beerPrompts[0] + "?"); 
    } else { 
      $('#question').text(winePrompts[0] + "?");
    }
  }
  initListeners();



  function initListeners () {

    //The following two onclick events call the quiz function and checks to see how much progress the quizee has made.
    $('#wine').on('click', function () {
      completed = 0;
      $('#progress').text('');
      quiz(shuffledWine, wineObject);
      if (progress === shuffledWine.length) {
        alert('You have reached the end of the wine quiz! You have ' + wineAwards +' out of ' + shuffledWine.length + 'awards!')
        progress = 0;
      }
    });

    $('#beer').on('click', function () {
      completed = 0;
      quiz(shuffledBeer, beerObject);
      if (progress === shuffledBeer.length) {
        alert('You have reached the end of the beer quiz! You have ' + beerAwards + ' out of ' + shuffledBeer.length + ' awards!')
        progress = 0;
      }
    })
    


    
    $('#button').on('click', function () {
     
      var input = $('#inputA').val().replace(/\s+/g, '').toLowerCase();
      individualProgress++;

      //Here we are checking the value of the text field against the text we have in our questions array.  If they match, the 'right' variable is incremented and a check image is appended to the DOM to indicate success!  Otherwise the wrong answer is pushed to an array containing the wrong answers, and right is not incremented.
      if (input === questions[completed]) {
        right++;
        appendProgress($("<img class='prog' src='check.png'>"));
      } else { 
        wrong.push(questions[completed]);
        appendProgress($("<img class='prog' src='x.png'>"));
      }
      completed++;
      //When the end is reached, we check to see how many were answered correctly.  If they are all right, an 'awardBottle' is given, otherwise we're given the option to try again or move on.  
      if (completed === 5) {

        if (right===5) {
          alert('Nice work! Click your newly awarded bottle to see a breif description, or click the above icons to select another wine or beer!');

          if (isBeer) {
            beerAwards++;
            var bottle = $("<img class='awardBottle' id='bottle' src='beerButton.png' style='width: 30px; height: 30px'>").attr('id', bottleId);

            $('.getBottle').append(bottle);

            if (beerAwards === beerArray.length) {
              $('#atHand').text('You have completed all of the Beers!');
              awardImage(completedBeer);
            }
          } else {
            wineAwards++;
            var bottle = $("<img class='awardBottle' id='bottle' src='bottle2.png' style='width: 10px; height: 30px'>").attr('id', bottleId);
            $('.getBottle').append(bottle);
            if (wineAwards === wineArray.length) {

              $('#atHand').text('You have completed all of the Wines!');
              awardImage(completedWine);
            }
          }
        } else {
        alert('You answered ' + wrong.length + ' incorrectly, try again or select another beverage!');
        }
        if (wineAwards === wineArray.length && beerAwards === beerArray.length) {
          $('#atHand').text('WOW! You have all the bottles! You are a true master.');
          awardImage(completedQuiz);
          alert('WOW! You have all the bottles!  You are a true master.')
        }

      $('#progress').text('');
      wrong = [];
      completed = 0;
      right = 0;
      }
      //This small conditional cycles through and refreshes the prompts as progress is made through the quiz.
      if (isBeer) {
        $('#question').text(beerPrompts[completed] + "?");
      } else {
        $('#question').text(winePrompts[completed] + "?");
      }
      

      
     //This click interaction references the id attached to each appended beverage image and offers a description of the beverage. 
      $('#inputA').val('');

      $('.awardBottle').on('click', function () {
        if (beerById.hasOwnProperty(this.id)) {
          var selectedBeer = beerObject[beerById[this.id]];
          $('#atHand').text(".::" +selectedBeer.name +"::.");
          $('#question').text(selectedBeer.message);
        } else {
          var selectedWine = wineObject[wineById[this.id]];
          $('#atHand').text(".::" +selectedWine.name +"::.");
          $('#question').text(selectedWine.message);
        }
     });

    });

    //The first listener here enables the button that runs the quiz interaction to be 'clicked' when the enter button is pressed.  The second deals with the form submission, since we aren't trying to 'submit' anything to the server from the text field, we just return false.
    $('#inputA').keypress(function (e) {
      if(e.keyCode==13)
        $('#button').click();
     });

     $('.form').on('submit', function () {
        return false;
      });
  }

});


  //===========================//
  //The following are functions that I used when first making the quiz to play with getting different values.  They aren't used in the quiz game but as this is a work in progress, I decided to leave them just in case they prove useful at a later date.  

  // function whereFrom (obj, name) {
  //   if (obj.hasOwnProperty(name)) {
  //     console.log("This lovely beverage is from " + 
  //                 obj[name].region + ", " + obj[name].state + ".");
  //   }
  // }

  // function checkNotes (obj, name) {
  //     if (obj.hasOwnProperty(name)) {
  //     console.log(obj[name].notes);
  //   }
  // }

  // function addNotes (obj, name, note) {
  //    obj.hasOwnProperty(name) ? obj[name].notes += ("+" + note + "\n") : null;
  // }

  // //===========================//
  // //Wine Only
  // function accessWine (name, action) {
  //         action(name);
  // }

  // function whatType (name) {
  //   wineObject.hasOwnProperty(name) ? console.log("This is a " + wineObject[name].type + " wine") : null;
  //         }

  // function whichVineyard (name) {
  //   if (wineObject.hasOwnProperty(name)) {
  //       console.log("This wine is from " + wineObject[name].vineyard);
  //   }
  // }
  // // whichVineyard();
  // //===========================//
  // // Beer Only
  // function accessBeer (name, action) {
  //     action(name);
  // }
   
  // function whichBrewery (name) {
  //   if (beerObject.hasOwnProperty(name)) {
  //     console.log("This beer is brewed by the fine folks at " + beerObject[name].brewery);
  //   }
  // }


  // function whichStyle (name) {
  //   if (beerObject.hasOwnProperty(name)) {
  //       console.log("This is a " + beerObject[name].style);
  //   }
  // }






