class DateCalculator {
    addSubtractDays(date, operator, days) {
        console.log(date, days);
        if (operator == "+") {
            date.setDate(date.getDate() + days);
        } else if (operator == "-") {
            date.setDate(date.getDate() - days);
        }
        return date;
    }

    toDMY(date) {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
}

class OptionsInterface {
    constructor() {
        this.formSign = document.querySelector("#input-sign");
        this.formSignRadios = this.formSign.querySelectorAll("input");
        this.formAmount = document.querySelector("#input-amount");
        this.formAmountRadios = this.formAmount.querySelectorAll("input");
    }

    returnOptions() {

    }
}

class Interface {
    constructor() {
        this.currentDateDisplay = document.querySelector("#date-current");
        this.outputDateDisplay = document.querySelector("#date-output");
        this.optionsInterface = new OptionsInterface(this);
    }
}

class MainProcess {
    constructor() {
        this.intervalToDay = {};
        this.intervalToDay["day"] = 1;
        this.intervalToDay["week"] = 7;
        this.intervalToDay["fortnight"] = 14;
        this.intervalToDay["two-fortnights"] = 28;

        this.dateCalculator = new DateCalculator();
        this.interface = new Interface();
        this.currentDate = new Date();
        this.currentDateStr = this.dateCalculator.toDMY(this.currentDate);

        this.interface.currentDateDisplay.innerText = this.currentDateStr;

        this.updateOptionSign("+");
        this.updateOptionAmount("day");
        this.updateOutput();

        this.interface.optionsInterface.formSignRadios.forEach(divRadio => {
            divRadio.addEventListener("click", () => {
                console.log(divRadio.value);
                this.updateOptionSign(divRadio.value);
                this.updateOutput();
            });
        });

        this.interface.optionsInterface.formAmountRadios.forEach(divRadio => {
            divRadio.addEventListener("click", () => {
                this.updateOptionAmount(divRadio.value);
                this.updateOutput();
            });
        });
    }

    updateOptionSign(val) {
        this.optionSign = val;
    }

    updateOptionAmount(val) {
        this.optionAmount = val;
    }

    updateOutput() {
        const currentDateCopy = new Date(this.currentDate.getTime());
        this.outputDate = this.dateCalculator.addSubtractDays(currentDateCopy, this.optionSign, this.intervalToDay[this.optionAmount]);
        this.outputDateStr = this.dateCalculator.toDMY(this.outputDate);
        this.interface.outputDateDisplay.innerText = this.outputDateStr;
    }
}

mainProcess = new MainProcess()