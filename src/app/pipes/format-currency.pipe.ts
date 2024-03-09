import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  standalone: true
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(number?: number): string {
    return number?.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }) || '';
  }

}
