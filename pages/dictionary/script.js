const createRows = data => {
  const words = Object.keys(data);
  const table = document.querySelector('table');

  words.forEach((word, index) => {
    const row = document.createElement('tr');

    const orderCell = document.createElement('td');
    orderCell.innerText = index;
    row.appendChild(orderCell);

    const wordCell = document.createElement('td');
    wordCell.innerText = word;
    row.appendChild(wordCell);

    const meaningCell = document.createElement('td');
    meaningCell.innerText = data[word].meaning;
    row.appendChild(meaningCell);

    const exampleCell = document.createElement('td');
    exampleCell.innerText = data[word].example;
    row.appendChild(exampleCell);

    const boxCell = document.createElement('td');
    boxCell.innerText = data[word].box;
    row.appendChild(boxCell);

    table.appendChild(row);
  });
};

browser.storage.local.get().then(createRows);
