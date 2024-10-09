const accounts = {}; // Словник для зберігання рахунків
const transactionHistory = {}; // Словник для зберігання історії транзакцій

document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const clientID = document.getElementById('clientID').value;
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);

    accounts[clientID] = {
        name: clientName,
        balance: initialBalance,
        transactions: []
    };

    alert(`Рахунок для ${clientName} створено!`);
    document.getElementById('accountForm').reset();
});

document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const clientID = document.getElementById('transactionClientID').value;
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const transactionType = document.getElementById('transactionType').value;

    if (!accounts[clientID]) {
        alert('Рахунок не знайдено!');
        return;
    }

    if (transactionType === 'withdraw' && accounts[clientID].balance < amount) {
        alert('Недостатньо коштів на рахунку!');
        return;
    }

    switch (transactionType) {
        case 'deposit':
            accounts[clientID].balance += amount;
            accounts[clientID].transactions.push(`Поповнення: ${amount}`);
            break;
        case 'withdraw':
            accounts[clientID].balance -= amount;
            accounts[clientID].transactions.push(`Зняття: ${amount}`);
            break;
        case 'transfer':
            const transferClientID = prompt('Введіть ідентифікаційний номер отримувача:');
            if (!accounts[transferClientID]) {
                alert('Отримувач не знайдений!');
                return;
            }
            accounts[clientID].balance -= amount;
            accounts[transferClientID].balance += amount;
            accounts[clientID].transactions.push(`Переведення: ${amount} до ${transferClientID}`);
            accounts[transferClientID].transactions.push(`Отримано: ${amount} від ${clientID}`);
            break;
    }

    alert('Операція виконана!');
    document.getElementById('transactionForm').reset();
});

document.getElementById('viewBalanceButton').addEventListener('click', function() {
    const clientID = document.getElementById('balanceClientID').value;
    if (accounts[clientID]) {
        document.getElementById('balanceResult').innerText = `Баланс: ${accounts[clientID].balance}`;
    } else {
        alert('Рахунок не знайдено!');
    }
});

document.getElementById('viewHistoryButton').addEventListener('click', function() {
    const clientID = document.getElementById('historyClientID').value;
    const historyList = document.getElementById('historyResult');
    historyList.innerHTML = ''; // Очищаємо попередній результат

    if (accounts[clientID]) {
        accounts[clientID].transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.innerText = transaction;
            historyList.appendChild(listItem);
        });
    } else {
        alert('Рахунок не знайдено!');
    }
});