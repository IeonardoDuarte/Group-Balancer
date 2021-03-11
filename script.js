window.onload = function () {
    class Person {
        constructor(name, weight) {
            this._name = name;
            this._weight = weight;
        }

        get name() {
            return this._name;
        }

        get weight() {
            return this._weight;
        }
    }

    const addButton = document.querySelector('.add-btn');
    const balanceButton = document.querySelector('.balance-btn');
    const clearButton = document.querySelector('.clear-btn');
    const nameInput = document.querySelector('.name-input');
    const weightInput = document.querySelector('.weight-input');
    const groupSizeInput = document.querySelector('.group-size-input');
    const itemCounter = document.querySelector('.counter');
    const nameTable = document.querySelector('.name-table');

    let people = [];
    let balanced = [];

    function writeInTable(item) {
        nameTable.innerHTML += `
            <tr>
                <td class="name">${item.name}</td>
                <td class="weight">${item.weight}</td>
            </tr>`
    }

    function updateList(list) {
        nameTable.innerHTML = "";

        list.forEach(person => {
            writeInTable(person);
        });
    };

    addButton.addEventListener('click', () => {
        if (nameInput.value != '' && weightInput.value != '') {
            people.push(new Person(nameInput.value, weightInput.value));
            itemCounter.innerHTML = `Quantity of items: ${people.length}`;
            updateList(people);
        }
    });

    balanceButton.addEventListener('click', () => {
        let groupSize = groupSizeInput.value;
        balanced = [];

        people.sort(function (a, b) {
            if (parseInt(a.weight) > parseInt(b.weight))
                return 1;
            if (parseInt(a.weight) < parseInt(b.weight))
                return -1;

            return 0;
        });

        let peopleReverse = [];
        people.forEach(i => {
            peopleReverse.push(i)
        });
        peopleReverse.reverse();

        for (let i = 0; i < Math.floor(people.length / 2); i++) {
            balanced.push(peopleReverse[i]);
            balanced.push(people[i]);
        }
        if (people.length % 2 != 0) {
            balanced.push(people[Math.floor(people.length / 2)]);
        }
        balanced.reverse();

        console.log(people);
        console.log(peopleReverse);
        console.log(balanced);


        nameTable.innerHTML = "";
        let group = 0;
        for (let i = 0; i < balanced.length; i++) {
            if (i % groupSize == 0) {
                group++;
                nameTable.innerHTML += `<tr class="group-size"><td colspan="2" style="text-align: center">Group ${group}</td></tr>`;
            }

            writeInTable(balanced[i]);
        }
    });

    clearButton.addEventListener('click', () => {
        people = [];
        balanced = [];
        nameTable.innerHTML = '';
        nameInput.value = '';
        weightInput.value = '';
        groupSizeInput.value = '';
        itemCounter.innerHTML = `Quantity of items: ${people.length}`;
    });
};