module.exports = totalNumber => {
  let poolMoney = 0;
  let possibleWinners = 0;
  if (totalNumber > 0 && totalNumber <= 20) {
    poolMoney = 1000;
    possibleWinners = 1;
  } else if (totalNumber >= 21 && totalNumber <= 50) {
    poolMoney = 2000;
    possibleWinners = 1;
  } else if (totalNumber > 50 && totalNumber <= 100) {
    poolMoney = 3000;
    possibleWinners = 1;
  } else if (totalNumber >= 101 && totalNumber <= 150) {
    poolMoney = 3000;
    possibleWinners = 2;
  } else if (totalNumber >= 151 && totalNumber <= 200) {
    poolMoney = 5000;
    possibleWinners = 2;
  } else if (totalNumber >= 201 && totalNumber <= 250) {
    poolMoney = 5000;
    possibleWinners = 3;
  } else if (totalNumber >= 251 && totalNumber <= 350) {
    poolMoney = 10000;
    possibleWinners = 2;
  } else if (totalNumber >= 351 && totalNumber <= 500) {
    poolMoney = 10000;
    possibleWinners = 3;
  } else if (totalNumber >= 551 && totalNumber <= 600) {
    poolMoney = 10000;
    possibleWinners = 4;
  } else if (totalNumber >= 601 && totalNumber <= 800) {
    poolMoney = 10000;
    possibleWinners = 5;
  } else if (totalNumber >= 801 && totalNumber <= 1000) {
    poolMoney = 10000;
    possibleWinners = 7;
  } else if (totalNumber >= 1001 && totalNumber <= 3000) {
    poolMoney = 15000;
    possibleWinners = 5;
  } else if (totalNumber >= 3001 && totalNumber <= 6500) {
    poolMoney = 10000;
    possibleWinners = 10;
  } else if (totalNumber >= 6501 && totalNumber <= 9999) {
    poolMoney = 25000;
    possibleWinners = 10;
  } else if (totalNumber >= 10000 && totalNumber <= 49999) {
    poolMoney = 50000;
    possibleWinners = 10;
  } else if (totalNumber >= 50000) {
    poolMoney = 50000;
    possibleWinners = 20;
  }
  return { poolMoney, possibleWinners };
};
