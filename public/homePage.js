const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();

function getStocks() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

function setIntervalImmediately(func, interval) {
  func(); // Немедленное исполнение функции
  return setInterval(func, interval); // Затем функция продолжает работать по интервалу
}

const intervalId = setIntervalImmediately(getStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(
        response.success,
        "Счет пользователя " +
          response.data.login +
          " успешно пополнен на " +
          data.amount +
          data.currency
      );
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(
        response.success,
        data.fromAmount +
          data.fromCurrency +
          " успешно конвертировано в " +
          data.targetCurrency
      );
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(
        response.success,
        data.amount +
          data.currency +
          " успешно переведены на счет пользователя!"
      );
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        response.success,
        "Пользователь: " + data.name + " успешно добавлен в избранное!"
      );
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
};

favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        response.success,
        "Пользователь с id: " + id + " успешно удален!"
      );
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
};