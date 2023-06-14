//to calculate total,min,max,average of transactions

const calculateTransactions = (arr) => {
  const transactionArray = arr?.map((item) => item?.amount);

  const totalRows = transactionArray?.length || 0;// takes the total records that user has entered
  //sum of all transactions
  const sumTotal = arr
    ?.map((item) => item?.amount)
    .reduce((acc, curr) => {
      return Number(acc) + Number(curr);
    }, 0);

  //average of all transactions
  const average = sumTotal / totalRows; 

  //minimum transaction
  const min = Math.min(...transactionArray);

  //maximum transaction
  const max = Math.max(...transactionArray);

  return {
    sumTotal,
    average,
    min,
    max,
  };
};

export default calculateTransactions;
