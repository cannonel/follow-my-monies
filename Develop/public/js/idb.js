let db;
const request = indexedDB.open('money_db', 1);
request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('new_deposit', { autoIncrement: true });
  db.createObjectStore('new_expense', { autoIncrement: true });
};
request.onsuccess = function(event) {
  // when db is successfully created with its object store (from onupgradedneeded event above), save reference to db in global variable
  db = event.target.result;
  // check if app is online, if yes run checkDatabase() function to send all local db data to api
  if (navigator.onLine) {
    // uploadPizza();
  }
};
request.onerror = function(event) {
  // log error here
  console.log(event.target.errorCode);
};
function saveDepositRecord(record) {
  const depositTransaction = db.transaction(['new_deposit'], 'readwrite');
  const depositObjectStore = depositTransaction.objectStore('new_deposit');
  // add record to your store with add method.
  depositObjectStore.add(record);
};
function saveExpenseRecord(record) {
    const expenseTransaction = db.transaction(['new_expense'], 'readwrite');
    const expenseObjectStore = expenseTransaction.objectStore('new_expense');
    // add record to your store with add method.
    expenseObjectStore.add(record);
  }
// function uploadPizza() {
//   // open a transaction on your pending db
//   const transaction = db.transaction(['new_pizza'], 'readwrite');
//   // access your pending object store
//   const pizzaObjectStore = transaction.objectStore('new_pizza');
//   // get all records from store and set to a variable
//   const getAll = pizzaObjectStore.getAll();
//   getAll.onsuccess = function() {
//     // if there was data in indexedDb's store, let's send it to the api server
//     if (getAll.result.length > 0) {
//       fetch('/api/pizzas', {
//         method: 'POST',
//         body: JSON.stringify(getAll.result),
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           'Content-Type': 'application/json'
//         }
//       })
//         .then(response => response.json())
//         .then(serverResponse => {
//           if (serverResponse.message) {
//             throw new Error(serverResponse);
//           }
//           const transaction = db.transaction(['new_pizza'], 'readwrite');
//           const pizzaObjectStore = transaction.objectStore('new_pizza');
//           // clear all items in your store
//           pizzaObjectStore.clear();
//         })
//         .catch(err => {
//           // set reference to redirect back here
//           console.log(err);
//         });
//     }
//   };
}
// listen for app coming back online
window.addEventListener('online', uploadPizza);