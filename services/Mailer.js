const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// similar to react creating a custom component to add functionality to the sendgrid Mailer class
// constructor is the same as the new Object keyword
// content is the surveyTemplate body or html body of the email
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sendGridApi = sendgrid(keys.sendGridProdKey);
    this.from_email = new helper.Email('no-replay@feeback.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    // built in function with the mail class
    this.addContent(this.body);

    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sendGridApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sendGridApi.API(request); //this is the api request to sendgrid
    return response;
  }
}

module.exports = Mailer;
