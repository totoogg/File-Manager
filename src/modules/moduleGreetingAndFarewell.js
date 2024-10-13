class GreetingAndFarewell {
  greeting(printName) {
    console.log(`Welcome to the File Manager, ${printName}!`);
  }

  farewell(printName) {
    console.log(`Thank you for using File Manager, ${printName}, goodbye!`);
  }
}

export const logging = new GreetingAndFarewell();
