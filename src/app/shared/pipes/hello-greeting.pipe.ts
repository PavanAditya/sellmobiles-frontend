import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'helloGreeting'
})
export class HelloGreetingPipe implements PipeTransform {

  transform(value: string, greeting?: string): string {
    if (value === null) {
      value = '';
    }
    const greetUser = `${greeting} ${value}`;
    return greetUser;
  }
}
