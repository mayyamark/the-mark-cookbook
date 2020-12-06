const createMeasureSchema = {
  measureName: (value) => {
    if (!value) {
      return 'Measure\'s name is required!';
    }
    if (typeof value !== 'string' || value.trim().length < 1) {
      return 'Measure\'s name must be a string with more than 1 character!';
    }
    return null;
  },
};

export default createMeasureSchema;
