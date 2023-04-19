enum MeasurementUnit {
    teaspoon = "teaspoon",
    tablespoon = "tablespoon",
    fluidOunce = "fluid ounce",
    cup = "cup",
    milliliter = "milliliter",
  }
  
  interface Measurement {
    amount: number;
    unit: MeasurementUnit;
  }
  
  function convertMeasurement(measurement: Measurement, toUnit: MeasurementUnit): Measurement {
    let { amount, unit } = measurement;
  
    // Convert to milliliters
    switch (unit) {
      case MeasurementUnit.teaspoon:
        amount *= 4.92892;
        break;
      case MeasurementUnit.tablespoon:
        amount *= 14.7868;
        break;
      case MeasurementUnit.fluidOunce:
        amount *= 29.5735;
        break;
      case MeasurementUnit.cup:
        amount *= 236.588;
        break;
      default:
        break;
    }
  
    // Convert from milliliters
    switch (toUnit) {
      case MeasurementUnit.teaspoon:
        amount /= 4.92892;
        break;
      case MeasurementUnit.tablespoon:
        amount /= 14.7868;
        break;
      case MeasurementUnit.fluidOunce:
        amount /= 29.5735;
        break;
      case MeasurementUnit.cup:
        amount /= 236.588;
        break;
      default:
        break;
    }
  
    return { amount, unit: toUnit };
  }