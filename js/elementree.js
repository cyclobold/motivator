/**
 * ElementreeJs is a simple elements library
 * 
 */

class ElementreeClass {


	constructor(){


	}


	/**
	 * Creates a particular element and returns the info about the created element 
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	createElement(element){

		const newElement = document.createElement(element);

		//wrap this new element up..
		//

		return newElement;


	}




}

let Elementree = new ElementreeClass();

export { Elementree };
