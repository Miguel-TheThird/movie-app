import _ from 'lodash';

export function paginate(items, pageNumber, pageSize){
//First calculate the starting index of the items on this page(pageNumber)
const startIndex = (pageNumber - 1) * pageSize  //pageSize is 4 
//Now use lodash to go to this start index and take all the items from the current page.
 return _(items).slice(startIndex).take(pageSize).value();
 
}