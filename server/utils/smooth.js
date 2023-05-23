function smoothWindSpeed(currentValue, previousWrites) {
    const sum = previousWrites.reduce((total, write) => total + write.wind_speed, 0);
    const average = sum / previousWrites.length;
    const result = (currentValue + average) / 2;
    return result.toFixed(2);
}
  
function circularDifference(a, b) {
    const diff = Math.abs(a - b) % 360;
    return diff > 180 ? 360 - diff : diff;
}
  
function smoothWindDirection(currentValue, previousWrites) {
    const smoothingFactor = 0.5;
  
    const directions = previousWrites.map((write) => write.wind_deg);
    directions.push(currentValue);
  
    const weightedSum = directions.reduce((acc, direction) => acc + direction, 0);
    const smoothedDirection = weightedSum / directions.length;
  
    const circularDiff = circularDifference(currentValue, smoothedDirection);
    const result = currentValue + (smoothingFactor * circularDiff);
  
    return result.toFixed(2);
}
  
function smoothMinTemperature(currentValue, previousWrites) {
    const alpha = 0.2; 
    let ema = previousWrites.length > 0 ? previousWrites[0].temp_min : currentValue;
  
    for (let i = 1; i < previousWrites.length; i++) {
      const prevValue = previousWrites[i].temp_min;
      ema = alpha * prevValue + (1 - alpha) * ema;
    }
  
    const result = (currentValue + ema) / 2;
    return result.toFixed(2);
}
  
function smoothMaxTemperature(currentValue, previousWrites) {
    const alpha = 0.2; 
    let ema = previousWrites.length > 0 ? previousWrites[0].temp_max : currentValue;

    for (let i = 1; i < previousWrites.length; i++) {
      const prevValue = previousWrites[i].temp_max;
      ema = alpha * prevValue + (1 - alpha) * ema;
    }

    const result = (currentValue + ema) / 2;
    return result.toFixed(2);
}
  
function smoothHumidity(currentValue, previousWrites) {
    const sum = previousWrites.reduce((total, write) => total + write.humidity, 0);
    const average = sum / previousWrites.length;
    const result = (currentValue + average) / 2;
    return result.toFixed(2);
}

module.exports = {
    smoothWindSpeed,
    smoothWindDirection,
    smoothMinTemperature,
    smoothMaxTemperature,
    smoothHumidity
}