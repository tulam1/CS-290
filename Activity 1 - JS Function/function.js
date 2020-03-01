//This part is declaring a function before it is being called
add(3);

function add(i) {

	i = i + i;
   return i;
}

console.log(add(3));


//
console.log(sub(2));

var result = function sub(j) {

	return j - j;
}
