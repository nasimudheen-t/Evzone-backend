const fs = require('fs');


// Read orders from file
const readData = () => {
    if (fs.existsSync('orders.json')) {
      const data = fs.readFileSync('orders.json');
      return JSON.parse(data);
    }
    return [];
  };
  
  // Write orders to file
  const writeData = (data) => {
    fs.writeFileSync('orders.json', JSON.stringify(data, null, 2));
  };

  module.exports = {readData , writeData}