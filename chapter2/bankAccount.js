class BankAccount {
    #balance = 0;
  
    #updateBalance(amount) {
      this.#balance += Number(amount);
    }
  
    async deposit(input) {
      if (isNaN(input) || input == 0) {
        window.alert("Deposit amount must be a non-zero number!");
        return;
      }
      this.#updateBalance(input);
      window.alert("Transaction is on process!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.alert(`Transaction is done!\nYour new balance is: ${this.#balance}`);
    }
  
    async withdraw(input) {
      if (isNaN(input) || input == 0) {
        window.alert("Withdraw amount must be a non-zero number!");
        return;
      }
      if (this.#balance - input < 0) {
        window.alert("Insufficient balance!");
        return;
      }
      this.#balance -= input;
      window.alert("Transaction is on process!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.alert(`Transaction is done!\nYour new balance is: ${this.#balance}`);
    }
  
    async check() {
      window.alert("Please wait...");
      await new Promise((resolve) => setTimeout(resolve, 2500));
      window.alert(`Your balance is: ${this.#balance}`);
    }
  }
  
  const start = async () => {
    const bank = new BankAccount();
    let isOnProcess = true;
  
    while (isOnProcess) {
      input = window.prompt(
        "What do you want to do?\n1. Deposit\n2. Withdraw\n3. Check Balance\n4. Exit",
      );
      switch (input) {
        case "1":
          input = window.prompt("Input deposit amount:");
          await bank.deposit(input);
          break;
        case "2":
          input = window.prompt("Input withdraw amount:");
          await bank.withdraw(input);
          break;
        case "3":
          await bank.check();
          break;
        case "4":
          window.alert("Thank you!");
          isOnProcess = false;
          break;
        default:
          window.alert("Invalid input!");
          break;
      }
    }
  };
  
  start();