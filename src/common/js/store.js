
export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};

export function setHistory (word) {
let historyWord = window.localStorage.__historyWord__;
  if (!historyWord) {
    historyWord = word;
  } else {
    historyWord = historyWord.split(',');
    for (let i = 0; i < historyWord.length; i++) {
      if (word === historyWord[i]) {
        historyWord.splice(i, 1);
      }
    }
    historyWord = word + ',' + historyWord;
  }
  window.localStorage.__historyWord__ = historyWord;
}

export function getHistory (key) {
  let historyWord;
  historyWord = window.localStorage.getItem(key);
  if (historyWord) {
    historyWord = historyWord.split(',');
  }
  return historyWord;
}
export function clearHistory () {
  window.localStorage.removeItem('__historyWord__');
}
