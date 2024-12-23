export const productSchema = {
  name: {
      in: ['body'],
      isString: true,
      errorMessage: 'Name is required and should be a string',
  },
  price: {
      in: ['body'],
      isFloat: { options: { gt: 0 } },
      errorMessage: 'Price is required and should be a number greater than 0',
  },
  stock: {
    in: ['body'],
    isFloat: { options: { gt: 0 } },
    errorMessage: 'Stock is required and should be a number greater than 0',
},
};