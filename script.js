class Calculator{
  constructor() {
    this.value = 0;
    this.history = []
  }
  execute(command) {
    this.value = command.execute(this.value)
    this.history.push(command)
  }

  undo() {
    const command = this.history.pop();
    this.value = command.undo(this.value);
  }
}

class AddCommand {
  constructor(valueToAdd) {
    this.valueToAdd = valueToAdd;
  }
  execute(currentValue) {
    return this.valueToAdd + currentValue;
  }
  undo(currentValue) {
    return currentValue - this.valueToAdd;
  }
}

class SubtractCommand {
  constructor(valueToSubtract){
    this.value = valueToSubtract
  }

  execute(currentValue) {
    return currentValue - this.value;
  }

  undo(currentValue) {
    return currentValue + this.value;
  }
}

class MultiplyCommand {
  constructor(valueToMultiply) {
    this.value = valueToMultiply;
  }

  execute(currentValue) {
    return this.value * currentValue;
  }

  undo(currentValue) {
    return currentValue/ this.value;
  }
}

class DivideCommand {

  constructor(valueToDivide) {
    this.value = valueToDivide;
  }

  execute(currentValue) {
    return currentValue/this.value;
  }

  undo(currentValue) {
    return currentValue * this.value;
  }
}

class AddThenMultiply{
  constructor(valueToAdd, valueToMultiply) {
    this.addCommand = new AddCommand(valueToAdd);
    this.multiplyCommand = new MultiplyCommand(valueToMultiply);
  }
  
  execute(currentValue) {
    const newValue = this.addCommand.execute(currentValue);
    return this.multiplyCommand.execute(newValue);
  }

  undo(currentValue) {
    const newValue = this.multiplyCommand.undo(currentValue);
    return this.addCommand.undo(newValue);
  }
}

const calc = new Calculator();
calc.execute(new AddCommand(20));
console.log(calc.value);
calc.execute(new MultiplyCommand(5));
console.log(calc.value);
calc.execute(new DivideCommand(2));
console.log(calc.value);
calc.execute(new SubtractCommand(30));
console.log(calc.value);
calc.undo()
console.log(calc.value);
calc.execute(new AddThenMultiply(10, 2))
console.log(calc.value);
calc.undo()
console.log(calc.value);


//decoupling of business logic and main code(GUI etc) is the best advantage of this