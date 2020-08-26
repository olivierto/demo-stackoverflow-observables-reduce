import { of } from 'rxjs'; 
import { map,tap, switchMap } from 'rxjs/operators';

const getQuotesList = of([
  {"id":1,"symbol":"SP-500","date":"1927-12-30T07:00:00.000+00:00","open":17.66,"high":17.66,"low":17.66,"close":17.66,"volume":0},
  {"id":2,"symbol":"SP-500","date":"1928-01-03T07:00:00.000+00:00","open":17.76,"high":17.76,"low":17.76,"close":17.76,"volume":0}
])

const quotes = getQuotesList


const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[key] = result[key] || []).push(
      currentValue[key]
    );
    return result;
  }, {});
};

let valuesGroupedByKeys = {}


const allKeyObservable = quotes.pipe(
  switchMap(_quotes => {
    console.log(_quotes)
    _quotes.forEach((quote)=> {
      Object.keys(quote).forEach((key)=>{
        const result =  groupBy(_quotes,key)
        valuesGroupedByKeys[key] = result[key]
      })
    })
     console.log(valuesGroupedByKeys)
     return of(valuesGroupedByKeys)
  }))
  
  allKeyObservable.subscribe()




