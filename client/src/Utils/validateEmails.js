// This takes a string of emails, splits it by commas with .split() and removes whitespaces with .trim()
// Then run the array through the .filter() to check validity of email names or throw an error for bad emails
const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  // emails = emails.replace(/,\s*$/,''); this would be for allowing trailing commas by replacing the trailing comma with a empty string
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => regExp.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
