function smoothWindSpeed(currentValue, previousWrites) {
    const sum = previousWrites.reduce((total, write) => total + write.wind_speed, 0);
    const average = sum / previousWrites.length;
    const result = (currentValue + average) / 2;
    return result.toFixed(2);
}
  
function smoothWindDirection(currentValue, previousWrites) {
    const sum = previousWrites.reduce((total, write) => total + write.wind_deg, 0);
    const average = sum / previousWrites.length;
    const result = (currentValue + average) / 2;
    return result.toFixed(2);
}
  
function smoothMinTemperature(currentValue, previousWrites) {
    const sum = previousWrites.reduce((total, write) => total + write.temp_min, 0);
    const average = sum / previousWrites.length;
    const result = (currentValue + average) / 2;
    return result.toFixed(2);
}
  
function smoothMaxTemperature(currentValue, previousWrites) {
    const sum = previousWrites.reduce((total, write) => total + write.temp_max, 0);
    const average = sum / previousWrites.length;
    const result = (currentValue + average) / 2;
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