import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterby',
  pure:false
})
export class FilterbyPipe implements PipeTransform {

  transform(value: any, filterStatus: string , filtredBys :string) {
    if (value.length ===0 || filterStatus === ''){
      return value;
    }
    const resultArray=[];
    for(const item of value){
      if (item[filtredBys] === filterStatus){
        resultArray.push(item)
      }
    }
    return resultArray;
  }

}
