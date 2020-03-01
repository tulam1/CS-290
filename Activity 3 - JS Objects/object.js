function deepEqual(object1, object2) {

   if (object1 === object2) {
   	return true;
   }

   for (var prop in object1) { 
		if ((typeof object1 == "object" && typeof object1 != null) && (typeof object2 == "object" && object2 != null)) {
			return deepEqual(object1[prop], object2[prop]);	
      }

      else {
      	return false;
      }

   return true;
   }

}

function Automobile( year, make, model, type ){
   this.year = year; //integer (ex. 2001, 1995)
   this.make = make; //string (ex. Honda, Ford)
   this.model = model; //string (ex. Accord, Focus)
   this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
   new Automobile(1995, "Honda", "Accord", "Sedan"),
   new Automobile(1990, "Ford", "F-150", "Pickup"),
   new Automobile(2000, "GMC", "Tahoe", "SUV"),
   new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
   new Automobile(2005, "Lotus", "Elise", "Roadster"),
   new Automobile(2008, "Subaru", "Outback", "Wagon")
   ];

console.log(deepEqual(automobiles[0],automobiles[2]));
