// Create a single employee record from an array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Create multiple employee records from a nested array
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

// Add a TimeIn event to an employee record
function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour),
    date,
  });
  return employee;
}

// Add a TimeOut event to an employee record
function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour),
    date,
  });
  return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, targetDate) {
  const timeIn = employee.timeInEvents.find(e => e.date === targetDate);
  const timeOut = employee.timeOutEvents.find(e => e.date === targetDate);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// Calculate all wages for an employee
function allWagesFor(employee) {
  return employee.timeInEvents
    .map(e => wagesEarnedOnDate(employee, e.date))
    .reduce((total, wage) => total + wage, 0);
}

// Calculate payroll for all employees
function calculatePayroll(employees) {
  return employees
    .map(allWagesFor)
    .reduce((total, empPay) => total + empPay, 0);
}
